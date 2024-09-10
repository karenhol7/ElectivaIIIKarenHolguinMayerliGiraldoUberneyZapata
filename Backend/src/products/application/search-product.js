const { getProductRepositoryByCriteria } = require('../infrastructure/productReposiroty');
const { ProductNotFound } = require('../exceptions/productNotFound');

async function searchProductByCriteriaUseCase(criteria) {
    try {
        const products = await getProductRepositoryByCriteria(criteria);
        return products;
    } catch (error) {
        throw error;
    }
}

module.exports = { searchProductByCriteriaUseCase };
