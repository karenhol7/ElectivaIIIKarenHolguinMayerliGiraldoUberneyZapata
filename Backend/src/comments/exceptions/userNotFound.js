class ExcepcionUserNotFound extends Error{

    constructor(userId){
        
        super(`user with id: ${userId} not found`)
    }
}

module.exports = {ExcepcionUserNotFound};