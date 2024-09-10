const {
  getUserRepositoryByUserName,
  authUser,
} = require("../infrastructure/userRepository");

const{ExcepcionUserNameNotFound}= require('../exceptions/userNameNotFound')
const{ExcepcionWrongCredentials}= require('../exceptions/wrongCredentials')

async function authUserUseCase(credentials) {
    
  const user = await getUserRepositoryByUserName(credentials.userName);
  
  if (!user) {
    throw new ExcepcionUserNameNotFound(credentials.userName)
  }
  const token = await authUser(credentials)
  
  if (!token){
    throw new ExcepcionWrongCredentials();
  }

  return {user: user, token: token};
}


module.exports = {authUserUseCase}
