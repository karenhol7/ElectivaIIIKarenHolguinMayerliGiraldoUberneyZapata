const mongoose = require('mongoose');
const {productSchema} = require('../domain/product.schema');

const productModel = mongoose.model('Product', productSchema);

module.exports = {productModel}