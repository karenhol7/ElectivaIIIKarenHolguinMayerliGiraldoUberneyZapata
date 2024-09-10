class ExcepcionProductWithoutComments extends Error {

    constructor(productId) {

        super(`product with id: ${productId} has no comments`)
    }
}

module.exports = { ExcepcionProductWithoutComments };