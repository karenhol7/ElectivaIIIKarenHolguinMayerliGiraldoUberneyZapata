const { FollowModel } = require('./follow.model');

async function followUser(userId, followedUserId) {
  try {
    const follow = new FollowModel({
      userId: userId,
      followedUserId: followedUserId
    });
    const newFollow = await follow.save();
    return newFollow;
  } catch (error) {
    throw error;
  }
}

async function getFollowersRepository(userId) {
  try {
    // Buscar todos los documentos en la colección FollowModel donde el followedUserId sea igual al userId
    const followers = await FollowModel.find({ followedUserId: userId }).populate('userId');
    return followers.map(follow => follow.userId);
  } catch (error) {
    throw error;
  }
}

async function getFollowingsRepository(userId) {
  try {
    const followings = await FollowModel.find({ userId: userId }).populate('followedUserId');
    return followings;
  } catch (error) {
    throw error;
  }
}

async function unfollowUser(userId, followedUserId) {
  try {
    const result = await FollowModel.findOneAndDelete({
      userId: userId,
      followedUserId: followedUserId
    });
    return result;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  followUser,
  getFollowersRepository,
  getFollowingsRepository,
  unfollowUser
};
