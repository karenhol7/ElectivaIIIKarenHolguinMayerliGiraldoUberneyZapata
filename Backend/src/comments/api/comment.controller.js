const { addCommentUseCase } = require('../application/create-comment');
const { getAvgRatingByProductIdUseCase } = require('../application/calculate-avgRating');
const { ExcepcionUserNotFound } = require('../exceptions/userNotFound');
const { ExcepcionProductWithoutComments } = require('../exceptions/ProductWithoutComments');
const { ProductNotFound } = require('../../products/exceptions/productNotFound');

async function createComment(req, res) {
    try {

        const newComment = await addCommentUseCase(req.body);
        return res.status(201).json({ comment: newComment });

    } catch (error) {

        if (error instanceof ProductNotFound) {
            return res.status(404).json({ message: error.message });
        }

        else if (error instanceof ExcepcionUserNotFound) {
            return res.status(404).json({ message: error.message });
        }

        return res.status(500).json({ message: error });
    }
}

async function getAvgRating(req, res) {
    try {

        const getAvgRating = await getAvgRatingByProductIdUseCase(req.params.productId);
        return res.status(200).json({ average: getAvgRating });

    } catch (error) {

        if (error instanceof ProductNotFound) {
            return res.status(404).json({ message: error.message });
        }

        else if (error instanceof ExcepcionProductWithoutComments) {
            return res.status(404).json({ message: error.message })
        }

        return res.status(500).json({ message: error });
    }
}

module.exports = { createComment, getAvgRating };