const { searchByUserIdUseCase } = require('../search-byUserId');
const { getProductRepositoryByUserId } = require('../../infrastructure/productReposiroty');

jest.mock('../../infrastructure/productReposiroty', () => ({
  getProductRepositoryByUserId: jest.fn()
}));

describe('searchByUserIdUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return products for a given user ID', async () => {
    const userId = 'testUserId';
    const products = [
      { id: 'product1', name: 'Test Product 1', userId },
      { id: 'product2', name: 'Test Product 2', userId }
    ];

    getProductRepositoryByUserId.mockResolvedValue(products);

    const result = await searchByUserIdUseCase(userId);

    expect(result).toEqual(products);
    expect(getProductRepositoryByUserId).toHaveBeenCalledWith(userId);
  });

  it('should return an empty array if no products are found for a given user ID', async () => {
    const userId = 'testUserId';

    getProductRepositoryByUserId.mockResolvedValue([]);

    const result = await searchByUserIdUseCase(userId);

    expect(result).toEqual([]);
    expect(getProductRepositoryByUserId).toHaveBeenCalledWith(userId);
  });

  it('should handle errors and throw an error', async () => {
    const userId = 'testUserId';
    const error = new Error('Something went wrong');

    getProductRepositoryByUserId.mockRejectedValue(error);

    await expect(searchByUserIdUseCase(userId)).rejects.toThrow(error);
    expect(getProductRepositoryByUserId).toHaveBeenCalledWith(userId);
  });
});
