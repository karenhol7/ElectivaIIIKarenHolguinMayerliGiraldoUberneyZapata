const { getProductDetailRepository } = require('../infrastructure/productReposiroty');
const { ProductNotFound } = require('../exceptions/productNotFound');

async function getProductDetaislUseCase(productId) {

    const productDetails = await getProductDetailRepository(productId);

    if (!productDetails.detailProduct) {

        throw new ProductNotFound(productId);
    }

    return productDetails;

}

module.exports = { getProductDetaislUseCase };