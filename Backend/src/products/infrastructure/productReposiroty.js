const { productModel } = require("./product");
const {
  getCommentRepositoryByProductId,
} = require("../../comments/infrastructure/commentRepository");
const { commentModel } = require("../../comments/infrastructure/comment.model");
const { FollowModel } = require('../../follows/infrastructure/follow.model')

async function createProductRepository(productRequest) {
  try {
    const product = new productModel({
      userId: productRequest.userId,
      name: productRequest.name,
      description: productRequest.description,
      url: productRequest.url,
      tags: productRequest.tags,
      image: productRequest.image,
      createdAt: productRequest.createdAt,
      updatedAt: productRequest.updatedAt,
    });

    const save = await product.save();
    return save;
  } catch (error) {
    return error;
  }
}

async function getProductRepositoryById(id) {
  try {
    const product = await productModel.findById(id);
    return product;
  } catch (error) {
    return error;
  }
}

async function getProductRepositoryByName(name) {
  try {
    const product = await productModel.findOne({ name: name });
    return product;
  } catch (error) {
    return error;
  }
}

async function getProductRepositoryByCriteria(criteria) {
  try {
    const query = {};

    if (criteria.name) {
      query.name = new RegExp(criteria.name, 'i')
    }
    if (criteria.category) {
      query.category = criteria.category;
    }
    if (criteria.tags && criteria.tags.length > 0) {
      query.tags = { $all: criteria.tags };
    }
    if (criteria.rate) {
      query.rate = criteria.rate;
    }

    const products = await productModel.find(query);
    return products;
  } catch (error) {
    throw error;
  }
}

async function updateProductRepositoryById(productUpdate) {
  try {
    productUpdate.updatedAt = Date.now();
    const updatedProduct = await productModel.findByIdAndUpdate(
      productUpdate.id,
      productUpdate,
      { new: true }
    );
    return updatedProduct;
  } catch (error) {
    return error;
  }
}

async function deleteProductRepositoryById(idRequest) {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(idRequest);
    return deletedProduct;
  } catch (error) {
    return error;
  }
}

async function getProductDetailRepository(productId) {
  try {
    const detailProduct = await productModel.findById(productId);
    const commentsProduct = await commentModel.find({ productId: detailProduct.id })
      .populate("userId", "userName email avatar bio") // Solo incluye algunos campos del usuario
      .exec();
    console.log(commentsProduct)
    return {
      detailProduct,
      commentsProduct,
    };
  } catch (error) {
    return error;
  }
}


async function getProductRepositoryByUserId(userId) {
  try {
    const product = await productModel.find({ userId: userId });
    return product;
  } catch (error) {
    return error;
  }
}

async function getProductRepositoryByDate(startDate, endDate) {
  try {

    const product = await productModel.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    return product;

  } catch (error) {
    return error;
  }
}

module.exports = {
  createProductRepository,
  getProductRepositoryByCriteria,
  updateProductRepositoryById,
  getProductRepositoryById,
  deleteProductRepositoryById,
  getProductDetailRepository,
  getProductRepositoryByName,
  getProductRepositoryByUserId,
  getProductRepositoryByDate
};

