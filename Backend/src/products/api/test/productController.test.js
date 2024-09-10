const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const {
  saveProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
  searchProduct,
  productByFollowers,
  getProductsByDate,
  getProductByUserId
} = require('../product.controller'); // Ajusta la ruta según tu estructura de carpetas

jest.mock('../../application/create-product', () => ({
  createProductUseCase: jest.fn()
}));
jest.mock('../../application/update-product', () => ({
  updateProductUseCase: jest.fn()
}));
jest.mock('../../application/delete-product', () => ({
  deleteProductUseCase: jest.fn()
}));
jest.mock('../../application/search-product', () => ({
  searchProductByCriteriaUseCase: jest.fn()
}));
jest.mock('../../application/detail-product', () => ({
  getProductDetaislUseCase: jest.fn()
}));
jest.mock('../../application/followers-products', () => ({
  getProductsByFollowersUseCase: jest.fn()
}));
jest.mock('../../application/search-date', () => ({
  getProductByDateUseCase: jest.fn()
}));
jest.mock('../../application/search-byUserId', () => ({
  searchByUserIdUseCase: jest.fn()
}));

const { createProductUseCase } = require('../../application/create-product');
const { updateProductUseCase } = require('../../application/update-product');
const { deleteProductUseCase } = require('../../application/delete-product');
const { searchProductByCriteriaUseCase } = require('../../application/search-product');
const { getProductDetaislUseCase } = require('../../application/detail-product');
const { getProductsByFollowersUseCase } = require('../../application/followers-products');
const { getProductByDateUseCase } = require('../../application/search-date');
const { searchByUserIdUseCase } = require('../../application/search-byUserId');

const app = express();
app.use(express.json());

app.post('/product', saveProducts);
app.put('/product', updateProduct);
app.delete('/product/:id', deleteProduct);
app.get('/product/:id', getProductDetails);
app.get('/products/search', searchProduct);
app.get('/products/followers', productByFollowers);
app.post('/products/date', getProductsByDate);
app.get('/products/user/:id', getProductByUserId);

describe('Product Controller', () => {
  let token;
  const secretKey = 'testsecret';

  beforeAll(() => {
    process.env.SECRET_KEY = secretKey;
    token = jwt.sign({ userId: 'testUserId' }, secretKey);
  });

  afterAll(() => {
    delete process.env.SECRET_KEY;
  });

  it('should save a new product', async () => {
    const product = { name: 'Test Product' };
    createProductUseCase.mockResolvedValue(product);

    const response = await request(app)
      .post('/product')
      .send(product);

    expect(response.status).toBe(201);
    expect(response.body.product).toEqual(product);
    expect(createProductUseCase).toHaveBeenCalledWith(product);
  });

  it('should update a product', async () => {
    const product = { id: 'testProductId', name: 'Updated Product' };
    updateProductUseCase.mockResolvedValue(product);

    const response = await request(app)
      .put('/product')
      .send(product);

    expect(response.status).toBe(201);
    expect(response.body.product).toEqual(product);
    expect(updateProductUseCase).toHaveBeenCalledWith(product);
  });

  it('should delete a product', async () => {
    const product = { id: 'testProductId' };
    deleteProductUseCase.mockResolvedValue(product);

    const response = await request(app)
      .delete(`/product/${product.id}`);

    expect(response.status).toBe(201);
    expect(response.body.product).toEqual(product);
    expect(deleteProductUseCase).toHaveBeenCalledWith(product.id);
  });

  it('should get product details', async () => {
    const product = { id: 'testProductId', name: 'Test Product' };
    getProductDetaislUseCase.mockResolvedValue(product);

    const response = await request(app)
      .get(`/product/${product.id}`);

    expect(response.status).toBe(200);
    expect(response.body.product).toEqual(product);
    expect(getProductDetaislUseCase).toHaveBeenCalledWith(product.id);
  });

  it('should search products', async () => {
    const products = [{ id: 'testProductId', name: 'Test Product' }];
    searchProductByCriteriaUseCase.mockResolvedValue(products);

    const response = await request(app)
      .get('/products/search')
      .query({ name: 'Test Product' });

    expect(response.status).toBe(200);
    expect(response.body.products).toEqual(products);
    expect(searchProductByCriteriaUseCase).toHaveBeenCalledWith({ category: undefined, name: 'Test Product', tags: [], rate: undefined });
  });

  it('should get products by followers', async () => {
    const products = [{ id: 'testProductId', name: 'Test Product' }];
    getProductsByFollowersUseCase.mockResolvedValue(products);

    const response = await request(app)
      .get('/products/followers')
      .set('Authorization', token)
      .query({ name: 'Test Product' });

    expect(response.status).toBe(200);
    expect(response.body.products).toEqual(products);
    expect(getProductsByFollowersUseCase).toHaveBeenCalledWith('testUserId', { name: 'Test Product', category: undefined, tags: undefined, rate: undefined });
  });

  it('should get products by date range', async () => {
    const products = [{ id: 'testProductId', name: 'Test Product' }];
    getProductByDateUseCase.mockResolvedValue(products);

    const response = await request(app)
      .post('/products/date')
      .send({ startDate: '2023-01-01', endDate: '2023-12-31' });

    expect(response.status).toBe(200);
    expect(response.body.product).toEqual(products);
    expect(getProductByDateUseCase).toHaveBeenCalledWith(new Date('2023-01-01'), new Date('2023-12-31'));
  });

  it('should get products by user id', async () => {
    const products = [{ id: 'testProductId', name: 'Test Product' }];
    searchByUserIdUseCase.mockResolvedValue(products);

    const response = await request(app)
      .get('/products/user/testUserId');

    expect(response.status).toBe(200);
    expect(response.body.products).toEqual(products);
    expect(searchByUserIdUseCase).toHaveBeenCalledWith('testUserId');
  });
});
