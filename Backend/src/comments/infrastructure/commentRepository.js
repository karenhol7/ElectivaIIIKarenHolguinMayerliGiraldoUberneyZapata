const { commentModel } = require("./comment.model");
const { productModel } = require('../../products/infrastructure/product')

async function createCommentRepository(commentRequest) {
  try {
    const comment = new commentModel({
      productId: commentRequest.productId,
      userId: commentRequest.userId,
      content: commentRequest.comment,
      rate: commentRequest.rate,
      createdAt: commentRequest.createdAt,
      updatedAt: commentRequest.updatedAt,
    });

    const save = await comment.save();

    await updateProductRating(commentRequest.productId);

    return save;
  } catch (error) {
    return error;
  }
}

async function getCommentRepositoryByProductId(productId) {
  try {
    const comment = await commentModel.find({ productId: productId });
    return comment;
  } catch (error) {
    return error;
  }
}

async function getCommentRepositoryByUserId(userId) {
  try {
    const comment = await commentModel.find({ userId: userId });
    return comment;
  } catch (error) {
    return error;
  }
}

async function updateProductRating(productId) {
  try {
    const comments = await commentModel.find({ productId: productId });
    if (comments.length > 0) {
      const totalRating = comments.reduce((acc, comment) => acc + comment.rate, 0);
      const avgRating = totalRating / comments.length;
      await productModel.findByIdAndUpdate(productId, { rate: avgRating });
    } else {
      await productModel.findByIdAndUpdate(productId, { rate: 0 });
    }
  } catch (error) {
    console.error("Error updating product rating:", error);
  }
}

module.exports = {
  createCommentRepository,
  getCommentRepositoryByProductId,
  getCommentRepositoryByUserId,
};
