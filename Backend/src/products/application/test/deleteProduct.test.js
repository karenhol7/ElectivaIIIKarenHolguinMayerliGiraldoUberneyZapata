const { deleteProductUseCase } = require('../delete-product');
const { deleteProductRepositoryById, getProductRepositoryById } = require('../../infrastructure/productReposiroty');
const { ProductNotFound } = require('../../exceptions/productNotFound');

jest.mock('../../infrastructure/productReposiroty', () => ({
  deleteProductRepositoryById: jest.fn(),
  getProductRepositoryById: jest.fn()
}));

describe('deleteProductUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a product if it exists', async () => {
    const productId = 'testProductId';
    const product = { id: productId, name: 'Test Product' };

    getProductRepositoryById.mockResolvedValue(product);
    deleteProductRepositoryById.mockResolvedValue(product);

    const result = await deleteProductUseCase(productId);

    expect(result).toEqual(product);
    expect(getProductRepositoryById).toHaveBeenCalledWith(productId);
    expect(deleteProductRepositoryById).toHaveBeenCalledWith(productId);
  });

  it('should throw a ProductNotFound exception if the product does not exist', async () => {
    const productId = 'nonexistentProductId';

    getProductRepositoryById.mockResolvedValue(null);

    await expect(deleteProductUseCase(productId)).rejects.toThrow(ProductNotFound);
    expect(getProductRepositoryById).toHaveBeenCalledWith(productId);
    expect(deleteProductRepositoryById).not.toHaveBeenCalled();
  });
});
