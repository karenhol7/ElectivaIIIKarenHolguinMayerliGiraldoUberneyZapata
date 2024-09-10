const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const { FollowModel } = require('../follow.model'); 
const {
  followUser,
  getFollowersRepository,
  getFollowingsRepository,
  unfollowUser
} = require('../followRepository'); 

describe('FollowRepository', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should create a new follow', async () => {
    const _doc = {
      _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
      userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
      followedUserId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
      createdAt: new Date(),
      isFollowing: true
    };

    mockingoose(FollowModel).toReturn(_doc, 'save');

    const result = await followUser(_doc.userId, _doc.followedUserId);

    expect(result.toObject()).toEqual(expect.objectContaining(_doc));
  });

  it('should get followers of a user', async () => {
    const followers = [
      {
        _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
        userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        followedUserId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
        createdAt: new Date(),
        isFollowing: true
      },
      {
        _id: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        userId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
        followedUserId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
        createdAt: new Date(),
        isFollowing: true
      }
    ];

    mockingoose(FollowModel).toReturn(followers, 'find');

    const result = await getFollowersRepository('507f191e810c19729de860ec');

    expect(result).toHaveLength(2);
    expect(result[0]._id).toEqual(followers[0].userId);
    expect(result[1]._id).toEqual(followers[1].userId);
  });

  it('should get followings of a user', async () => {
    const followings = [
      {
        _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
        userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        followedUserId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
        createdAt: new Date(),
        isFollowing: true
      },
      {
        _id: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        followedUserId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
        createdAt: new Date(),
        isFollowing: true
      }
    ];

    mockingoose(FollowModel).toReturn(followings, 'find');

    const result = await getFollowingsRepository('507f191e810c19729de860eb');

    expect(result).toHaveLength(2);
    expect(result[0]._id).toEqual(followings[0]._id);
    expect(result[1]._id).toEqual(followings[1]._id);
  });

  it('should unfollow a user', async () => {
    const _doc = {
      _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
      userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
      followedUserId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
      createdAt: new Date(),
      isFollowing: true
    };

    mockingoose(FollowModel).toReturn(_doc, 'findOneAndDelete');

    const result = await unfollowUser(_doc.userId, _doc.followedUserId);

    expect(result.toObject()).toEqual(expect.objectContaining(_doc));
  });
});
