const { createComment, getAvgRating } = require('../comment.controller');
const { addCommentUseCase } = require('../../application/create-comment');
const { getAvgRatingByProductIdUseCase } = require('../../application/calculate-avgRating');
const { ExcepcionUserNotFound } = require('../../exceptions/userNotFound');
const { ExcepcionProductWithoutComments } = require('../../exceptions/ProductWithoutComments');
const { ProductNotFound } = require('../../../products/exceptions/productNotFound');


jest.mock('../../application/create-comment', () => ({
    addCommentUseCase: jest.fn(),
}));

jest.mock('../../application/calculate-avgRating', () => ({
    getAvgRatingByProductIdUseCase: jest.fn(),
}));

describe('createComment', () => {
    let req, res;

    beforeEach(() => {
        req = { body: { userId: 'user1', productId: 'product1', comment: 'Great product!' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should create a new comment and return 201 status', async () => {
        const newComment = { id: 'comment1', ...req.body };
        addCommentUseCase.mockResolvedValue(newComment);

        await createComment(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ comment: newComment });
    });

    it('should return 404 if ProductNotFound is thrown', async () => {
        const error = new ProductNotFound('Product not found');
        addCommentUseCase.mockRejectedValue(error);

        await createComment(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should return 404 if ExcepcionUserNotFound is thrown', async () => {
        const error = new ExcepcionUserNotFound('User not found');
        addCommentUseCase.mockRejectedValue(error);

        await createComment(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should return 500 for other errors', async () => {
        const error = new Error('Internal Server Error');
        addCommentUseCase.mockRejectedValue(error);

        await createComment(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: error });
    });
});

describe('getAvgRating', () => {
    let req, res;

    beforeEach(() => {
        req = { params: { productId: 'product1' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return average rating and 200 status', async () => {
        const avgRating = 4.5;
        getAvgRatingByProductIdUseCase.mockResolvedValue(avgRating);

        await getAvgRating(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ average: avgRating });
    });

    it('should return 404 if ProductNotFound is thrown', async () => {
        const error = new ProductNotFound('Product not found');
        getAvgRatingByProductIdUseCase.mockRejectedValue(error);

        await getAvgRating(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should return 404 if ExcepcionProductWithoutComments is thrown', async () => {
        const error = new ExcepcionProductWithoutComments('No comments for this product');
        getAvgRatingByProductIdUseCase.mockRejectedValue(error);

        await getAvgRating(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });

    it('should return 500 for other errors', async () => {
        const error = new Error('Internal Server Error');
        getAvgRatingByProductIdUseCase.mockRejectedValue(error);

        await getAvgRating(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: error });
    });
});
