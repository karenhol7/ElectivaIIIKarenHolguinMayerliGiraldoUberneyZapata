const { getProductByDateUseCase } = require('../search-date');
const { getProductRepositoryByDate } = require('../../infrastructure/productReposiroty');

jest.mock('../../infrastructure/productReposiroty', () => ({
  getProductRepositoryByDate: jest.fn()
}));

describe('getProductByDateUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return products within the given date range', async () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-12-31');
    const products = [
      { id: 'product1', name: 'Test Product 1', createdAt: new Date('2023-03-15') },
      { id: 'product2', name: 'Test Product 2', createdAt: new Date('2023-06-25') }
    ];

    getProductRepositoryByDate.mockResolvedValue(products);

    const result = await getProductByDateUseCase(startDate, endDate);

    expect(result).toEqual(products);
    expect(getProductRepositoryByDate).toHaveBeenCalledWith(startDate, endDate);
  });

  it('should return an empty array if no products are found within the given date range', async () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-12-31');

    getProductRepositoryByDate.mockResolvedValue([]);

    const result = await getProductByDateUseCase(startDate, endDate);

    expect(result).toEqual([]);
    expect(getProductRepositoryByDate).toHaveBeenCalledWith(startDate, endDate);
  });

  it('should handle errors and return the error', async () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-12-31');
    const error = new Error('Something went wrong');

    getProductRepositoryByDate.mockRejectedValue(error);

    const result = await getProductByDateUseCase(startDate, endDate);

    expect(result).toBe(error);
    expect(getProductRepositoryByDate).toHaveBeenCalledWith(startDate, endDate);
  });
});
