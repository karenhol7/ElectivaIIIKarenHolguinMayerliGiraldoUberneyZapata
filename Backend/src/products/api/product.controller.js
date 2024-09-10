const { createProductUseCase } = require("../application/create-product");
const { updateProductUseCase } = require("../application/update-product");
const { deleteProductUseCase } = require("../application/delete-product");
const { searchProductByCriteriaUseCase } = require("../application/search-product");
const { getProductDetaislUseCase } = require('../application/detail-product');
const { getProductsByFollowersUseCase } = require('../application/followers-products');
const { getProductByDateUseCase } = require('../application/search-date');
const {searchByUserIdUseCase} = require('../application/search-byUserId')
const jwt = require('jsonwebtoken');
const {
  ExcepcionProductAlreadyExist,
} = require("../exceptions/productAlreadyExist");
const {
  ProductNotFound
} = require("../exceptions/productNotFound");

async function saveProducts(req, res) {
  try {
    const newProduct = await createProductUseCase(req.body);
    return res.status(201).json({ product: newProduct });
  } catch (error) {
    if (error instanceof ExcepcionProductAlreadyExist) {
      return res.status(400).send({ error: error.message });
    }
    return res.status(500).json({ message: error });
  }
}

async function updateProduct(req, res) {
  try {
    const updatedProduct = await updateProductUseCase(req.body);
    return res.status(201).json({ product: updatedProduct });
  } catch (error) {
    if (error instanceof ProductNotFound) {
      return res.status(404).send({ error: error.message });
    }
    return res.status(500).json({ message: error });
  }
}

async function deleteProduct(req, res) {
  try {
    const deletedProduct = await deleteProductUseCase(req.params.id);
    return res.status(201).json({ product: deletedProduct });
  } catch (error) {
    if (error instanceof ProductNotFound) {
      return res.status(404).send({ error: error.message });
    }
    return res.status(500).json({ message: error });
  }
}
async function searchProduct(req, res) {
  try {
    const { category, name, tags, rate } = req.query;
    const tagsArray = tags ? tags.split(',') : [];
    const products = await searchProductByCriteriaUseCase({ category, name, tags: tagsArray, rate });

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getProductDetails(req, res) {
  try {


    const productDetails = await getProductDetaislUseCase(req.params.id);

    return res.status(200).json({ product: productDetails });

  } catch (error) {

    if (error instanceof ProductNotFound) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: error });

  }
}

async function productByFollowers(req, res) {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    const searchProduct = {
      name: req.query.name,
      category: req.query.category,
      tags: req.query.tags,
      rate: req.query.rate
    };

    const followerProducts = await getProductsByFollowersUseCase(userId, searchProduct);
    return res.status(200).json(followerProducts);
  } catch (error) {
    return res.status(500).json({ message: 'Error getting products from followers', error: error.message });
  }
}

async function getProductsByDate(req, res) {
  try {
    const { startDate, endDate } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const product = await getProductByDateUseCase(start, end);
    return res.status(200).json({ product })

  } catch (error) {
    return res.status(500).json({ message: 'Error getting products by date range', error: error.message });
  }
}

async function getProductByUserId(req, res){
  try {
    const products = await searchByUserIdUseCase(req.params.id);
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: 'Error getting products by user id', error: error.message });
  }
}

module.exports = { saveProducts, updateProduct, deleteProduct, getProductDetails, searchProduct, productByFollowers, getProductsByDate, getProductByUserId };

