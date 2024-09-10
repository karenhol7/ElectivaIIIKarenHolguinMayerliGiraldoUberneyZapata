const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const { FollowModel } = require('../follow.model'); 

describe('FollowModel', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('should find a follow by id', async () => {
        const _doc = {
            _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
            userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
            followedUserId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
            createdAt: new Date(),
            isFollowing: true
        };

        mockingoose(FollowModel).toReturn(_doc, 'findOne');

        const result = await FollowModel.findById('507f191e810c19729de860ea').exec();

        expect(result.toObject()).toEqual(expect.objectContaining(_doc));
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

        const newFollow = new FollowModel(_doc);
        const result = await newFollow.save();

        expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });

    it('should update a follow', async () => {
        const _doc = {
            _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
            userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
            followedUserId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
            createdAt: new Date(),
            isFollowing: false
        };

        mockingoose(FollowModel).toReturn(_doc, 'findOneAndUpdate');

        const update = { isFollowing: false, updatedAt: new Date() };
        const result = await FollowModel.findByIdAndUpdate('507f191e810c19729de860ea', update, { new: true }).exec();

        expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });

    it('should delete a follow', async () => {
        const _doc = {
            _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
            userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
            followedUserId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
            createdAt: new Date(),
            isFollowing: true
        };

        mockingoose(FollowModel).toReturn(_doc, 'findOneAndDelete');

        const result = await FollowModel.findByIdAndDelete('507f191e810c19729de860ea').exec();

        expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });
});
