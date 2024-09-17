const mongoose = require('mongoose');
const { getProductsByFollowersUseCase } = require('../followers-products');
const { getProductRepositoryByUserId, getProductRepositoryByCriteria } = require('../../infrastructure/productReposiroty');
const { getFollowingsRepository } = require('../../../follows/infrastructure/followRepository');

jest.mock('../../infrastructure/productReposiroty', () => ({
  getProductRepositoryByUserId: jest.fn(),
  getProductRepositoryByCriteria: jest.fn()
}));

jest.mock('../../../follows/infrastructure/followRepository', () => ({
  getFollowingsRepository: jest.fn()
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
    const followers = [
      {
        followedUserId: {
          _id: products[0].userId,
          userName: 'Follower 1'
        }
      },
      {
        followedUserId: {
          _id: products[1].userId,
          userName: 'Follower 2'
        }
      }
    ];

    getFollowingsRepository.mockResolvedValue(followers);
    getProductRepositoryByCriteria.mockResolvedValue(products);

    const result = await getProductsByFollowersUseCase(userId, searchProduct);

    expect(result).toEqual([
      {
        user: {
          id: products[0].userId,
          name: 'Follower 1',
          products: products
        }
      },
      {
        user: {
          id: products[1].userId,
          name: 'Follower 2',
          products: products
        }
      }
    ]);
    expect(getFollowingsRepository).toHaveBeenCalledWith(userId);
    expect(getProductRepositoryByCriteria).toHaveBeenCalledWith({ ...searchProduct, userId: followers[0].followedUserId._id });
    expect(getProductRepositoryByCriteria).toHaveBeenCalledWith({ ...searchProduct, userId: followers[1].followedUserId._id });
  });

  it('should return products by followers if searchProduct is not provided', async () => {
    const userId = new mongoose.Types.ObjectId();
    const searchProduct = null;
    const followers = [
      {
        followedUserId: {
          _id: new mongoose.Types.ObjectId(),
          userName: 'Follower 1'
        }
      },
      {
        followedUserId: {
          _id: new mongoose.Types.ObjectId(),
          userName: 'Follower 2'
        }
      }
    ];
    const products = [
      { id: 'product1', name: 'Test Product 1', userId: followers[0].followedUserId._id },
      { id: 'product2', name: 'Test Product 2', userId: followers[1].followedUserId._id }
    ];

    getFollowingsRepository.mockResolvedValue(followers);
    getProductRepositoryByUserId.mockResolvedValueOnce([products[0]]).mockResolvedValueOnce([products[1]]);

    const result = await getProductsByFollowersUseCase(userId, searchProduct);

    expect(result).toEqual([
      {
        user: {
          id: followers[0].followedUserId._id,
          name: 'Follower 1',
          products: [products[0]]
        }
      },
      {
        user: {
          id: followers[1].followedUserId._id,
          name: 'Follower 2',
          products: [products[1]]
        }
      }
    ]);
    expect(getFollowingsRepository).toHaveBeenCalledWith(userId);
    expect(getProductRepositoryByUserId).toHaveBeenCalledWith(followers[0].followedUserId._id);
    expect(getProductRepositoryByUserId).toHaveBeenCalledWith(followers[1].followedUserId._id);
  });

  it('should return an empty array if no followers have products', async () => {
    const userId = new mongoose.Types.ObjectId();
    const searchProduct = null;
    const followers = [
      {
        followedUserId: {
          _id: new mongoose.Types.ObjectId(),
          userName: 'Follower 1'
        }
      },
      {
        followedUserId: {
          _id: new mongoose.Types.ObjectId(),
          userName: 'Follower 2'
        }
      }
    ];

    getFollowingsRepository.mockResolvedValue(followers);
    getProductRepositoryByUserId.mockResolvedValueOnce([]).mockResolvedValueOnce([]);

    const result = await getProductsByFollowersUseCase(userId, searchProduct);

    expect(result).toEqual([
      {
        user: {
          id: followers[0].followedUserId._id,
          name: 'Follower 1',
          products: []
        }
      },
      {
        user: {
          id: followers[1].followedUserId._id,
          name: 'Follower 2',
          products: []
        }
      }
    ]);
    expect(getFollowingsRepository).toHaveBeenCalledWith(userId);
    expect(getProductRepositoryByUserId).toHaveBeenCalledWith(followers[0].followedUserId._id);
    expect(getProductRepositoryByUserId).toHaveBeenCalledWith(followers[1].followedUserId._id);
  });

  it('should handle errors and return the error', async () => {
    const userId = new mongoose.Types.ObjectId();
    const searchProduct = null;
    const error = new Error('Something went wrong');

    getFollowingsRepository.mockRejectedValue(error);

    const result = await getProductsByFollowersUseCase(userId, searchProduct);

    expect(result).toBe(error);
    expect(getFollowingsRepository).toHaveBeenCalledWith(userId);
  });
});
