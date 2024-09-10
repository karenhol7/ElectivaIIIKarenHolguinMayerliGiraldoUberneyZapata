
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const { userModel } = require('../user.model');

describe('userModel', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('should find a user by id', async () => {
    const _doc = {
      _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
      userName: 'testUser',
      email: 'test@example.com',
      password: 'hashedpassword',
      bio: 'Test bio',
      avatar: 'avatar.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockingoose(userModel).toReturn(_doc, 'findOne');

    const result = await userModel.findById('507f191e810c19729de860ea').exec();

    expect(result.toObject()).toEqual(expect.objectContaining(_doc));
  });

  it('should create a new user', async () => {
    const _doc = {
      _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
      userName: 'newUser',
      email: 'new@example.com',
      password: 'hashedpassword',
      bio: 'New user bio',
      avatar: 'new_avatar.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockingoose(userModel).toReturn(_doc, 'save');

    const newUser = new userModel(_doc);
    const result = await newUser.save();

    expect(result.toObject()).toEqual(expect.objectContaining(_doc));
  });

  it('should update a user', async () => {
    const _doc = {
      _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
      userName: 'updatedUser',
      email: 'updated@example.com',
      password: 'hashedpassword',
      bio: 'Updated bio',
      avatar: 'updated_avatar.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockingoose(userModel).toReturn(_doc, 'findOneAndUpdate');

    const update = { userName: 'updatedUser', email: 'updated@example.com', bio: 'Updated bio', avatar: 'updated_avatar.jpg' };
    const result = await userModel.findByIdAndUpdate('507f191e810c19729de860ea', update, { new: true }).exec();

    expect(result.toObject()).toEqual(expect.objectContaining(_doc));
  });

  it('should delete a user', async () => {
    const _doc = {
      _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
      userName: 'testUser',
      email: 'test@example.com',
      password: 'hashedpassword',
      bio: 'Test bio',
      avatar: 'avatar.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockingoose(userModel).toReturn(_doc, 'findOneAndDelete');

    const result = await userModel.findByIdAndDelete('507f191e810c19729de860ea').exec();

    expect(result.toObject()).toEqual(expect.objectContaining(_doc));
  });
});