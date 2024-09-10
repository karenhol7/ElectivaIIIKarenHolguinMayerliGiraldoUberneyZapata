const { updateProductUseCase } = require('../update-product');
const { updateProductRepositoryById, getProductRepositoryById } = require('../../infrastructure/productReposiroty');
const { ProductNotFound } = require('../../exceptions/productNotFound');

jest.mock('../../infrastructure/productReposiroty', () => ({
  updateProductRepositoryById: jest.fn(),
  getProductRepositoryById: jest.fn()
}));

describe('updateProductUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update a product if it exists', async () => {
    const productRequest = { id: 'testProductId', name: 'Updated Product' };
    const product = { id: 'testProductId', name: 'Existing Product' };
    const updatedProduct = { ...product, ...productRequest };

    getProductRepositoryById.mockResolvedValue(product);
    updateProductRepositoryById.mockResolvedValue(updatedProduct);

    const result = await updateProductUseCase(productRequest);

    expect(result).toEqual(updatedProduct);
    expect(getProductRepositoryById).toHaveBeenCalledWith(productRequest.id);
    expect(updateProductRepositoryById).toHaveBeenCalledWith(productRequest);
  });

  it('should throw a ProductNotFound exception if the product does not exist', async () => {
    const productRequest = { id: 'nonexistentProductId', name: 'Updated Product' };

    getProductRepositoryById.mockResolvedValue(null);

    await expect(updateProductUseCase(productRequest)).rejects.toThrow(ProductNotFound);
    expect(getProductRepositoryById).toHaveBeenCalledWith(productRequest.id);
    expect(updateProductRepositoryById).not.toHaveBeenCalled();
  });

  it('should handle errors and throw the error', async () => {
    const productRequest = { id: 'testProductId', name: 'Updated Product' };
    const error = new Error('Something went wrong');

    getProductRepositoryById.mockRejectedValue(error);

    await expect(updateProductUseCase(productRequest)).rejects.toThrow(error);
    expect(getProductRepositoryById).toHaveBeenCalledWith(productRequest.id);
    expect(updateProductRepositoryById).not.toHaveBeenCalled();
  });
});
