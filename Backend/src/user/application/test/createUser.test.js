const { createUserUseCase } = require('../create-user');
const {
  createUserRepository,
  getUserRepositoryByUserName,
} = require('../../infrastructure/userRepository');
const { ExcepcionUserParameterAlreadyExist } = require('../../exceptions/userParameterAlreadyExist');

jest.mock('../../infrastructure/userRepository');

describe('createUserUseCase', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create a new user and return the user', async () => {
    const userRequest = { userName: 'newUser', password: 'password' };
    const createdUser = { id: '1', userName: 'newUser' };

    getUserRepositoryByUserName.mockResolvedValue(null);
    createUserRepository.mockResolvedValue(createdUser);

    const result = await createUserUseCase(userRequest);

    expect(result).toEqual(createdUser);
  });

  it('should throw ExcepcionUserParameterAlreadyExist if user already exists', async () => {
    const userRequest = { userName: 'existingUser', password: 'password' };
    const existingUser = { id: '1', userName: 'existingUser' };

    getUserRepositoryByUserName.mockResolvedValue(existingUser);

    await expect(createUserUseCase(userRequest)).rejects.toThrow(ExcepcionUserParameterAlreadyExist);
    await expect(createUserUseCase(userRequest)).rejects.toThrow(`user with parameter: ${userRequest.userName} already exist`);
  });
});