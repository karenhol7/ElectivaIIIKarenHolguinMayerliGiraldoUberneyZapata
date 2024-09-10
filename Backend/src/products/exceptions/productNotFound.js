class ProductNotFound extends Error{
    constructor(id){
        super(`product with id: ${id} not found`)
    }
}

module.exports = {ProductNotFound};