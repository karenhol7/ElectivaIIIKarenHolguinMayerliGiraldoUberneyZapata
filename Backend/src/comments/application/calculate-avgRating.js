const { getCommentRepositoryByProductId } = require('../infrastructure/commentRepository');
const { ExcepcionProductWithoutComments } = require('../exceptions/ProductWithoutComments');

async function getAvgRatingByProductIdUseCase(productId) {

    const comment = await getCommentRepositoryByProductId(productId);

    if (!comment || comment.length == 0) {

        throw new ExcepcionProductWithoutComments(productId);
    }

    const totalRating = comment.reduce((acc, comment) => acc + comment.rate, 0);
    const avgRating = totalRating / comment.length;
    return avgRating;

}

module.exports = { getAvgRatingByProductIdUseCase };