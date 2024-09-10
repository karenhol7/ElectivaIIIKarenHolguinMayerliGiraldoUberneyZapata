const {updateProductRepositoryById, getProductRepositoryById} = require('../infrastructure/productReposiroty')
const {ProductNotFound} = require('../exceptions/productNotFound')

async function updateProductUseCase(productRequest){
    const product = await getProductRepositoryById(productRequest.id);
    if(!product){
        throw new ProductNotFound(productRequest.id)
    }
    return await updateProductRepositoryById(productRequest);
}

module.exports = {updateProductUseCase}