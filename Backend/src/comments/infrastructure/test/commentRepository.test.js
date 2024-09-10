const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const {
  createCommentRepository,
  getCommentRepositoryByProductId,
  getCommentRepositoryByUserId,
} = require('../commentRepository');
const { commentModel } = require('../comment.model');

describe('commentRepository', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should create a new comment', async () => {
    const _doc = {
      _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
      productId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
      userId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
      content: 'Great product!',
      rate: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockingoose(commentModel).toReturn(_doc, 'save');

    const result = await createCommentRepository({
      productId: '507f191e810c19729de860eb',
      userId: '507f191e810c19729de860ec',
      comment: 'Great product!',
      rate: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(result.toObject()).toEqual(expect.objectContaining(_doc));
  });

  it('should find comments by productId', async () => {
    const _doc = [{
      _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
      productId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
      userId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
      content: 'Great product!',
      rate: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }];

    mockingoose(commentModel).toReturn(_doc, 'find');

    const result = await getCommentRepositoryByProductId('507f191e810c19729de860eb');

    expect(result).toEqual(expect.arrayContaining([expect.objectContaining(_doc[0])]));
  });

  it('should find comments by userId', async () => {
    const _doc = [{
      _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
      productId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
      userId: new mongoose.Types.ObjectId('507f191e810c19729de860ec'),
      content: 'Great product!',
      rate: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }];

    mockingoose(commentModel).toReturn(_doc, 'find');

    const result = await getCommentRepositoryByUserId('507f191e810c19729de860ec');

    expect(result).toEqual(expect.arrayContaining([expect.objectContaining(_doc[0])]));
  });
});
