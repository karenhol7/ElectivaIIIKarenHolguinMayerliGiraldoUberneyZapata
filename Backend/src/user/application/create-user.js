const {
  createUserRepository,
  getUserRepositoryByUserName,
} = require("../infrastructure/userRepository");
const {
  ExcepcionUserParameterAlreadyExist,
} = require("../exceptions/userParameterAlreadyExist");

async function createUserUseCase(userRequest) {
  
  const user = await getUserRepositoryByUserName(userRequest.userName);
  if (user) {
    throw new ExcepcionUserParameterAlreadyExist(userRequest.userName);
  }
  return await createUserRepository(userRequest);
}

module.exports = { createUserUseCase };
