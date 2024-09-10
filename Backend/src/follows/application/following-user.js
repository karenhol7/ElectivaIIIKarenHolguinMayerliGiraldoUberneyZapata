const { followUser, getFollowersRepository, getFollowingsRepository, unfollowUser } = require('../infrastructure/followRepository');

async function followUserUseCase(userId, followedUserId) {
  try {
    const newFollow = await followUser(userId, followedUserId);
    return newFollow;
  } catch (error) {
    throw error;
  }
}

async function getFollowersUseCase(userId) {
  try {
   
    const followers = await getFollowersRepository(userId);
    return followers;
  } catch (error) {
    throw error;
  }
}

async function getFollowingsUseCase(userId) {
  try {
    const followings = await getFollowingsRepository(userId);
    return followings;
  } catch (error) {
    throw error;
  }
}

async function unfollowUseCase(userId, unFollowedUserId){
  try {
    const unFollow = await unfollowUser(userId, unFollowedUserId);
    return unFollow;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  followUserUseCase,
  getFollowersUseCase,
  getFollowingsUseCase,
  unfollowUseCase
};
