const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
const { productModel } = require('../product');

describe('productModel', () => {
    beforeEach(() => {
        mockingoose.resetAll();
    });

    it('should find a product by id', async () => {
        const _doc = {
            _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
            userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
            name: 'Product 1',
            description: 'A great product',
            rate: 5,
            category: 'Category 1',
            url: 'http://example.com',
            image: 'http://example.com/image.png',
            tags: ['tag1', 'tag2'],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        mockingoose(productModel).toReturn(_doc, 'findOne');

        const result = await productModel.findById('507f191e810c19729de860ea').exec();

        expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });

    it('should create a new product', async () => {
        const _doc = {
            _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
            userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
            name: 'Product 1',
            description: 'A great product',
            rate: 5,
            category: 'Category 1',
            url: 'http://example.com',
            image: 'http://example.com/image.png',
            tags: ['tag1', 'tag2'],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        mockingoose(productModel).toReturn(_doc, 'save');

        const newProduct = new productModel(_doc);
        const result = await newProduct.save();

        expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });

    it('should update a product', async () => {
        const _doc = {
            _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
            userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
            name: 'Updated Product',
            description: 'An updated great product',
            rate: 4,
            category: 'Updated Category',
            url: 'http://example.com/updated',
            image: 'http://example.com/image-updated.png',
            tags: ['tag1', 'tag2', 'tag3'],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        mockingoose(productModel).toReturn(_doc, 'findOneAndUpdate');

        const update = { 
            name: 'Updated Product', 
            description: 'An updated great product',
            rate: 4,
            category: 'Updated Category',
            url: 'http://example.com/updated',
            image: 'http://example.com/image-updated.png',
            tags: ['tag1', 'tag2', 'tag3'],
            updatedAt: new Date() 
        };
        const result = await productModel.findByIdAndUpdate('507f191e810c19729de860ea', update, { new: true }).exec();

        expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });

    it('should delete a product', async () => {
        const _doc = {
            _id: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
            userId: new mongoose.Types.ObjectId('507f191e810c19729de860eb'),
            name: 'Product 1',
            description: 'A great product',
            rate: 5,
            category: 'Category 1',
            url: 'http://example.com',
            image: 'http://example.com/image.png',
            tags: ['tag1', 'tag2'],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        mockingoose(productModel).toReturn(_doc, 'findOneAndDelete');

        const result = await productModel.findByIdAndDelete('507f191e810c19729de860ea').exec();

        expect(result.toObject()).toEqual(expect.objectContaining(_doc));
    });
});