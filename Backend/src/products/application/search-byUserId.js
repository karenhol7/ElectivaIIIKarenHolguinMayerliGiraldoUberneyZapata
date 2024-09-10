const {getProductRepositoryByUserId} = require('../infrastructure/productReposiroty')

async function searchByUserIdUseCase(userId){
    const products = await getProductRepositoryByUserId(userId);
    return products
}

module.exports = { searchByUserIdUseCase };