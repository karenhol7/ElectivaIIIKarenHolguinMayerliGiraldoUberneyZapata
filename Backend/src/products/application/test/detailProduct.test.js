const { getProductDetaislUseCase } = require('../detail-product');
const { getProductDetailRepository } = require('../../infrastructure/productReposiroty');
const { ProductNotFound } = require('../../exceptions/productNotFound');

jest.mock('../../infrastructure/productReposiroty', () => ({
  getProductDetailRepository: jest.fn()
}));

describe('getProductDetaislUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return product details if the product exists', async () => {
    const productId = 'testProductId';
    const productDetails = {
      id: productId,
      name: 'Test Product',
      detailProduct: true
    };

    getProductDetailRepository.mockResolvedValue(productDetails);

    const result = await getProductDetaislUseCase(productId);

    expect(result).toEqual(productDetails);
    expect(getProductDetailRepository).toHaveBeenCalledWith(productId);
  });

  it('should throw a ProductNotFound exception if the product does not have detailProduct', async () => {
    const productId = 'testProductId';
    const productDetails = {
      id: productId,
      name: 'Test Product',
      detailProduct: false
    };

    getProductDetailRepository.mockResolvedValue(productDetails);

    await expect(getProductDetaislUseCase(productId)).rejects.toThrow(ProductNotFound);
    expect(getProductDetailRepository).toHaveBeenCalledWith(productId);
  });
});
