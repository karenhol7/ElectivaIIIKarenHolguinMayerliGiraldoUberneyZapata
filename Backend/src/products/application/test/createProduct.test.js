const { createProductUseCase } = require('../create-product');
const { createProductRepository, getProductRepositoryByName } = require('../../infrastructure/productReposiroty');
const { ExcepcionProductAlreadyExist } = require('../../exceptions/productAlreadyExist');

jest.mock('../../infrastructure/productReposiroty', () => ({
  createProductRepository: jest.fn(),
  getProductRepositoryByName: jest.fn()
}));

describe('createProductUseCase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new product if it does not already exist', async () => {
    const productRequest = { name: 'New Product', category: 'Category', price: 100 };
    const createdProduct = { id: 'productId', ...productRequest };

    getProductRepositoryByName.mockResolvedValue(null);
    createProductRepository.mockResolvedValue(createdProduct);

    const result = await createProductUseCase(productRequest);

    expect(result).toEqual(createdProduct);
    expect(getProductRepositoryByName).toHaveBeenCalledWith(productRequest.name);
    expect(createProductRepository).toHaveBeenCalledWith(productRequest);
  });

  it('should throw an ExcepcionProductAlreadyExist if the product already exists', async () => {
    const productRequest = { name: 'Existing Product', category: 'Category', price: 100 };
    const existingProduct = { id: 'productId', ...productRequest };

    getProductRepositoryByName.mockResolvedValue(existingProduct);

    await expect(createProductUseCase(productRequest)).rejects.toThrow(ExcepcionProductAlreadyExist);
    expect(getProductRepositoryByName).toHaveBeenCalledWith(productRequest.name);
    expect(createProductRepository).not.toHaveBeenCalled();
  });
});
