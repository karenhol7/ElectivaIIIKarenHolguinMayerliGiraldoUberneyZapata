const { getProductRepositoryByDate } = require('../infrastructure/productReposiroty')

async function getProductByDateUseCase(startDate, endDate) {
    try {
        const product = await getProductRepositoryByDate(startDate, endDate);
        return product;
    } catch (error) {
        return error;
    }
}

module.exports = { getProductByDateUseCase };