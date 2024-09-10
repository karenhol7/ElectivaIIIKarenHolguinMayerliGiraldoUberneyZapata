const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const { productModel } = require('../product');
const {
    createProductRepository,
    getProductRepositoryByCriteria,
    updateProductRepositoryById,
    getProductRepositoryById,
    deleteProductRepositoryById,
    getProductDetailRepository,
    getProductRepositoryByName,
    getProductRepositoryByUserId,
    getProductRepositoryByDate
  } = require('../productReposiroty');
  const { commentModel } = require('../../../comments/infrastructure/comment.model');
  
  describe('Product Repository', () => {
    beforeEach(() => {
      mockingoose.resetAll();
    });
  
    it('should create a new product', async () => {
      const _doc = {
        _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
        userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        name: 'Product 1',
        description: 'A great product',
        url: 'http://example.com',
        tags: ['tag1', 'tag2'],
        image: 'http://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      mockingoose(productModel).toReturn(_doc, 'save');
  
      const result = await createProductRepository(_doc);
      expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });
  
    it('should get a product by id', async () => {
      const _doc = {
        _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
        userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        name: 'Product 1',
        description: 'A great product',
        url: 'http://example.com',
        tags: ['tag1', 'tag2'],
        image: 'http://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      mockingoose(productModel).toReturn(_doc, 'findOne');
  
      const result = await getProductRepositoryById('507f191e810c19729de860ea');
      expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });
  
    it('should get a product by name', async () => {
      const _doc = {
        _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
        userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        name: 'Product 1',
        description: 'A great product',
        url: 'http://example.com',
        tags: ['tag1', 'tag2'],
        image: 'http://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      mockingoose(productModel).toReturn(_doc, 'findOne');
  
      const result = await getProductRepositoryByName('Product 1');
      expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });
  
    it('should get products by criteria', async () => {
      const _doc = [{
        _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
        userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        name: 'Product 1',
        description: 'A great product',
        url: 'http://example.com',
        tags: ['tag1', 'tag2'],
        image: 'http://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }];
  
      mockingoose(productModel).toReturn(_doc, 'find');
  
      const criteria = { name: 'Product 1', category: 'Category 1', tags: ['tag1'], rate: 5 };
      const result = await getProductRepositoryByCriteria(criteria);
      expect(result.map(res => res.toObject())).toEqual(expect.arrayContaining(_doc.map(doc => expect.objectContaining(doc))));
    });
  
    it('should update a product by id', async () => {
      const _doc = {
        _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
        userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        name: 'Updated Product',
        description: 'An updated great product',
        url: 'http://example.com',
        tags: ['tag1', 'tag2', 'tag3'],
        image: 'http://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      mockingoose(productModel).toReturn(_doc, 'findOneAndUpdate');
  
      const update = { id: '507f191e810c19729de860ea', name: 'Updated Product', description: 'An updated great product', tags: ['tag1', 'tag2', 'tag3'] };
      const result = await updateProductRepositoryById(update);
      expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });
  
    it('should delete a product by id', async () => {
      const _doc = {
        _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
        userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        name: 'Product 1',
        description: 'A great product',
        url: 'http://example.com',
        tags: ['tag1', 'tag2'],
        image: 'http://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      mockingoose(productModel).toReturn(_doc, 'findOneAndDelete');
  
      const result = await deleteProductRepositoryById('507f191e810c19729de860ea');
      expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });
  
    it('should get product details by id', async () => {
      const product = {
        _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
        userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        name: 'Product 1',
        description: 'A great product',
        url: 'http://example.com',
        tags: ['tag1', 'tag2'],
        image: 'http://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      const comments = [{
        _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
        productId: product._id,
        userId: new mongoose.Types.ObjectId('507f1f77bcf86cd799439012'),
        content: 'Great product!',
        createdAt: new Date(),
        updatedAt: new Date()
      }];
  
      mockingoose(productModel).toReturn(product, 'findOne');
      mockingoose(commentModel).toReturn(comments, 'find');
  
      const result = await getProductDetailRepository('507f191e810c19729de860ea');
      expect(result.detailProduct.toObject()).toEqual(expect.objectContaining(product));
      expect(result.commentsProduct.map(comment => comment.toObject())).toEqual(expect.arrayContaining(comments.map(comment => expect.objectContaining(comment))));
    });
  
    it('should get products by user id', async () => {
      const _doc = [{
        _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
        userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        name: 'Product 1',
        description: 'A great product',
        url: 'http://example.com',
        tags: ['tag1', 'tag2'],
        image: 'http://example.com/image.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }];
  
      mockingoose(productModel).toReturn(_doc, 'find');
  
      const result = await getProductRepositoryByUserId('507f191e810c19729de860eb');
      expect(result.map(res => res.toObject())).toEqual(expect.arrayContaining(_doc.map(doc => expect.objectContaining(doc))));
    });
  
    it('should get products by date range', async () => {
      const _doc = [{
        _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
        userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
        name: 'Product 1',
        description: 'A great product',
        url: 'http://example.com',
        tags: ['tag1', 'tag2'],
        image: 'http://example.com/image.png',
        createdAt: new Date('2024-05-01'),
        updatedAt: new Date('2024-05-02')
      }];
  
      mockingoose(productModel).toReturn(_doc, 'find');
  
      const result = await getProductRepositoryByDate(new Date('2024-05-01'), new Date('2024-05-02'));
      expect(result.map(res => res.toObject())).toEqual(expect.arrayContaining(_doc.map(doc => expect.objectContaining(doc))));
    });
  });