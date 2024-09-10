const { getProductRepositoryByUserId, getProductRepositoryByCriteria } = require('../infrastructure/productReposiroty');
const { getFollowingsRepository } = require('../../follows/infrastructure/followRepository');

async function getProductsByFollowersUseCase(userId, searchProduct) {
    try {
      const followers = await getFollowingsRepository(userId);
  
      let followerProducts = await Promise.all(followers.map(async (follower) => {
        const products = searchProduct && Object.keys(searchProduct).some(key => searchProduct[key])
          ? await getProductRepositoryByCriteria({ ...searchProduct, userId: follower.followedUserId._id })
          : await getProductRepositoryByUserId(follower.followedUserId._id);
        
        return {
          user: {
            id: follower.followedUserId._id,
            name: follower.followedUserId.userName,
            products: products
          }
        };
      }));
  
      return followerProducts;
    } catch (error) {
      throw new Error('Error getting products by followers');
    }
  }

module.exports = { getProductsByFollowersUseCase };
