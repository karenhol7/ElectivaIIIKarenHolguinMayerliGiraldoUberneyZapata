
const { authUserUseCase } = require('../auth-user');
const {
    getUserRepositoryByUserName,
    authUser,
  } = require('../../infrastructure/userRepository');
  const { ExcepcionUserNameNotFound } = require('../../exceptions/userNameNotFound');
  const { ExcepcionWrongCredentials } = require('../../exceptions/wrongCredentials');
  
  jest.mock('../../infrastructure/userRepository');
  
  describe('authUserUseCase', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    it('should authenticate user and return user and token', async () => {
      const credentials = { userName: 'testUser', password: 'password' };
      const user = { id: '1', userName: 'testUser' };
      const token = 'abc123';
  
      getUserRepositoryByUserName.mockResolvedValue(user);
      authUser.mockResolvedValue(token);
  
      const result = await authUserUseCase(credentials);
  
      expect(result).toEqual({ user, token });
    });
  
    it('should throw ExcepcionUserNameNotFound if user does not exist', async () => {
      const credentials = { userName: 'unknownUser', password: 'password' };
  
      getUserRepositoryByUserName.mockResolvedValue(null);
  
      await expect(authUserUseCase(credentials)).rejects.toThrow(ExcepcionUserNameNotFound);
      await expect(authUserUseCase(credentials)).rejects.toThrow(`userName: ${credentials.userName} not found`);
    });
  
    it('should throw ExcepcionWrongCredentials if authentication fails', async () => {
      const credentials = { userName: 'testUser', password: 'wrongpassword' };
      const user = { id: '1', userName: 'testUser' };
  
      getUserRepositoryByUserName.mockResolvedValue(user);
      authUser.mockResolvedValue(null);
  
      await expect(authUserUseCase(credentials)).rejects.toThrow(ExcepcionWrongCredentials);
    });
  });