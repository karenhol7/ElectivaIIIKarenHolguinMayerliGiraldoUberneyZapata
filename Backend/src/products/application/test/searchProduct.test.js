const { searchProductByCriteriaUseCase } = require('../search-product');
const { getProductRepositoryByCriteria } = require('../../infrastructure/productReposiroty');
const { ProductNotFound } = require('../../exceptions/productNotFound');

jest.mock('../../infrastructure/productReposiroty', () => ({
  getProductRepositoryByCriteria: jest.fn()
}));

describe('searchProductByCriteriaUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return products that match the given criteria', async () => {
    const criteria = { name: 'Test Product', category: 'Category' };
    const products = [
      { id: 'product1', name: 'Test Product 1', category: 'Category' },
      { id: 'product2', name: 'Test Product 2', category: 'Category' }
    ];

    getProductRepositoryByCriteria.mockResolvedValue(products);

    const result = await searchProductByCriteriaUseCase(criteria);

    expect(result).toEqual(products);
    expect(getProductRepositoryByCriteria).toHaveBeenCalledWith(criteria);
  });

  it('should return an empty array if no products match the given criteria', async () => {
    const criteria = { name: 'Nonexistent Product', category: 'Category' };

    getProductRepositoryByCriteria.mockResolvedValue([]);

    const result = await searchProductByCriteriaUseCase(criteria);

    expect(result).toEqual([]);
    expect(getProductRepositoryByCriteria).toHaveBeenCalledWith(criteria);
  });

  it('should handle errors and throw the error', async () => {
    const criteria = { name: 'Test Product', category: 'Category' };
    const error = new Error('Something went wrong');

    getProductRepositoryByCriteria.mockRejectedValue(error);

    await expect(searchProductByCriteriaUseCase(criteria)).rejects.toThrow(error);
    expect(getProductRepositoryByCriteria).toHaveBeenCalledWith(criteria);
  });
});
