class ExcepcionUserParameterAlreadyExist extends Error{
    constructor(parameter){
        super(`user with parameter: ${parameter} already exist`)
    }
}

module.exports = {ExcepcionUserParameterAlreadyExist};