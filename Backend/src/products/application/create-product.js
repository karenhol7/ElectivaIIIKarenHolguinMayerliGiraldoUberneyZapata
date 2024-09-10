const {createProductRepository, getProductRepositoryByName} = require('../infrastructure/productReposiroty')
const {ExcepcionProductAlreadyExist} = require('../exceptions/productAlreadyExist')

async function createProductUseCase(productRequest){
    const product = await getProductRepositoryByName(productRequest.name);
    if(product){
        throw new ExcepcionProductAlreadyExist(productRequest.name)
    }
    return await createProductRepository(productRequest);
}

module.exports = {createProductUseCase}