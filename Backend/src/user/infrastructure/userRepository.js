const { userModel } = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

async function createUserRepository(userRequest) {
  try {
    const hashPassword = await bcrypt.hash(userRequest.password, 10);

    const user = new userModel({
      userName: userRequest.userName,
      email: userRequest.email,
      password: hashPassword,
      bio: userRequest.bio,
      avatar: userRequest.avatar,
      createdAt: userRequest.createdAt,
      updatedAt: userRequest.updatedAt,
    });
    const newUser = await user.save();
    return newUser;
  } catch (error) {
    return error;
  }
}

async function getUserRepositoryByUserName(userName) {
  try {
    const user = await userModel.findOne({ userName: userName });
    return user;
  } catch (error) {
    return error;
  }
}

async function authUser(credentials) {
  try {
    const { userName, password } = credentials;
    const user = await userModel.findOne({ userName });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return false;
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    return token
  } catch (error) {
    return error;
  }
}

module.exports = {
  createUserRepository,
  getUserRepositoryByUserName,
  authUser,
};
