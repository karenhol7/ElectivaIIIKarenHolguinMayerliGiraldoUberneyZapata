const mongoose = require('mongoose');
const { getProductsByFollowersUseCase } = require('../followers-products');
const { getProductRepositoryByUserId, getProductRepositoryByCriteria } = require('../../infrastructure/productReposiroty');
const { getFollowersRepository } = require('../../../follows/infrastructure/followRepository');

jest.mock('../../infrastructure/productReposiroty', () => ({
  getProductRepositoryByUserId: jest.fn(),
  getProductRepositoryByCriteria: jest.fn()
}));

jest.mock('../../../follows/infrastructure/followRepository', () => ({
  getFollowersRepository: jest.fn()
}));

describe('getProductsByFollowersUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return products by followers if searchProduct is provided', async () => {
    const userId = new mongoose.Types.ObjectId();
    const searchProduct = {
      name: 'Test Product',
      category: 'Category',
      tags: ['tag1', 'tag2'],
      rate: 4
    };
    const products = [
      { id: 'product1', name: 'Test Product 1', userId: new mongoose.Types.ObjectId() },
      { id: 'product2', name: 'Test Product 2', userId: new mongoose.Types.ObjectId() }
    ];
    const followerIds = [
      { _id: products[0].userId },
      { _id: products[1].userId }
    ];

    getFollowersRepository.mockResolvedValue(followerIds);
    getProductRepositoryByCriteria.mockResolvedValue(products);

    const result = await getProductsByFollowersUseCase(userId, searchProduct);

    expect(result).toEqual(products);
    expect(getFollowersRepository).toHaveBeenCalledWith(userId);
    expect(getProductRepositoryByCriteria).toHaveBeenCalledWith(searchProduct);
  });

  it('should return products by followers if searchProduct is not provided', async () => {
    const userId = new mongoose.Types.ObjectId();
    const searchProduct = null;
    const followerIds = [
      { _id: new mongoose.Types.ObjectId() },
      { _id: new mongoose.Types.ObjectId() }
    ];
    const products = [
      [{ id: 'product1', name: 'Test Product 1', userId: followerIds[0]._id }],
      [{ id: 'product2', name: 'Test Product 2', userId: followerIds[1]._id }]
    ];

    getFollowersRepository.mockResolvedValue(followerIds);
    getProductRepositoryByUserId.mockResolvedValueOnce(products[0]).mockResolvedValueOnce(products[1]);

    const result = await getProductsByFollowersUseCase(userId, searchProduct);

    expect(result).toEqual(products.flat());
    expect(getFollowersRepository).toHaveBeenCalledWith(userId);
    expect(getProductRepositoryByUserId).toHaveBeenCalledWith(followerIds[0]._id);
    expect(getProductRepositoryByUserId).toHaveBeenCalledWith(followerIds[1]._id);
  });

  it('should return an empty array if no followers have products', async () => {
    const userId = new mongoose.Types.ObjectId();
    const searchProduct = null;
    const followerIds = [
      { _id: new mongoose.Types.ObjectId() },
      { _id: new mongoose.Types.ObjectId() }
    ];
    const products = [[], []];

    getFollowersRepository.mockResolvedValue(followerIds);
    getProductRepositoryByUserId.mockResolvedValueOnce(products[0]).mockResolvedValueOnce(products[1]);

    const result = await getProductsByFollowersUseCase(userId, searchProduct);

    expect(result).toEqual([]);
    expect(getFollowersRepository).toHaveBeenCalledWith(userId);
    expect(getProductRepositoryByUserId).toHaveBeenCalledWith(followerIds[0]._id);
    expect(getProductRepositoryByUserId).toHaveBeenCalledWith(followerIds[1]._id);
  });

  it('should handle errors and return the error', async () => {
    const userId = new mongoose.Types.ObjectId();
    const searchProduct = null;
    const error = new Error('Something went wrong');

    getFollowersRepository.mockRejectedValue(error);

    const result = await getProductsByFollowersUseCase(userId, searchProduct);

    expect(result).toBe(error);
    expect(getFollowersRepository).toHaveBeenCalledWith(userId);
  });
});
