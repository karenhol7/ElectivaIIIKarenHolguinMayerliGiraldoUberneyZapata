const {deleteProductRepositoryById, getProductRepositoryById} = require('../infrastructure/productReposiroty')
const {ProductNotFound} = require('../exceptions/productNotFound')

async function deleteProductUseCase(idRequest){
    
    const product = await getProductRepositoryById(idRequest);
    if(!product){
        throw new ProductNotFound(idRequest)
    }
    
    return await deleteProductRepositoryById(idRequest);
}

module.exports = {deleteProductUseCase}