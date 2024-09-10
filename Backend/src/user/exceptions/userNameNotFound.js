class ExcepcionUserNameNotFound extends Error{
    constructor(userName){
        super(`userName: ${userName} not found`)
    }
}

module.exports = {ExcepcionUserNameNotFound};