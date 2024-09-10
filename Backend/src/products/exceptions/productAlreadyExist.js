class ExcepcionProductAlreadyExist extends Error{
    constructor(name){
        super(`product with name: ${name} already exist`)
    }
}

module.exports = {ExcepcionProductAlreadyExist};