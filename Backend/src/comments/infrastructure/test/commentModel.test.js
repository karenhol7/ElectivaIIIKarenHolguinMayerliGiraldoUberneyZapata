const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const { commentModel } = require('../comment.model');

describe('commentModel', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('should find a comment by id', async () => {
        const _doc = {
            _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
            productId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
            userId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
            content: 'Great product!',
            rate: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        mockingoose(commentModel).toReturn(_doc, 'findOne');

        const result = await commentModel.findById('507f191e810c19729de860ea').exec();

        expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });

    it('should create a new comment', async () => {
        const _doc = {
            _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
            productId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
            userId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
            content: 'Great product!',
            rate: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        mockingoose(commentModel).toReturn(_doc, 'save');

        const newComment = new commentModel(_doc);
        const result = await newComment.save();

        expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });

    it('should update a comment', async () => {
        const _doc = {
            _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
            productId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
            userId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
            content: 'Updated comment',
            rate: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        mockingoose(commentModel).toReturn(_doc, 'findOneAndUpdate');

        const update = { content: 'Updated comment', rate: 4, updatedAt: new Date() };
        const result = await commentModel.findByIdAndUpdate('507f191e810c19729de860ea', update, { new: true }).exec();

        expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });

    it('should delete a comment', async () => {
        const _doc = {
            _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
            productId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
            userId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
            content: 'Great product!',
            rate: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        mockingoose(commentModel).toReturn(_doc, 'findOneAndDelete');

        const result = await commentModel.findByIdAndDelete('507f191e810c19729de860ea').exec();

        expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });
});
