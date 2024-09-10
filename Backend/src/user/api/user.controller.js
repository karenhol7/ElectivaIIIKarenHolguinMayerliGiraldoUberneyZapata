const { createUserUseCase } = require("../application/create-user");
const { authUserUseCase } = require("../application/auth-user");
const {
  ExcepcionUserParameterAlreadyExist,
} = require("../exceptions/userParameterAlreadyExist");
const { ExcepcionUserNameNotFound } = require("../exceptions/userNameNotFound");
const { ExcepcionWrongCredentials } = require("../exceptions/wrongCredentials");

async function singUp(req, res) {
  try {
    const newUser = await createUserUseCase(req.body);
    return res.status(201).json({ user: newUser });
  } catch (error) {
    if (error instanceof ExcepcionUserParameterAlreadyExist) {
      return res.status(400).send({ error: error.message });
    }
    return res.status(500).json({ message: error });
  }
}

async function login(req, res) {
  try {
    const userWithToken = await authUserUseCase(req.body);
    return res.status(201).json({ userInfo: userWithToken });
  } catch (error) {
    if (error instanceof ExcepcionUserNameNotFound) {
      return res.status(400).send({ error: error.message });
    }
    if (error instanceof ExcepcionWrongCredentials) {
      return res.status(400).send({ error: error.message });
    }
    return res.status(500).json({ message: error });
  }
}

module.exports = { singUp, login };
