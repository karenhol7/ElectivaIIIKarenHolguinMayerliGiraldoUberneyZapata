const { addCommentUseCase } = require('../create-comment');
const { createCommentRepository, getCommentRepositoryByProductId, getCommentRepositoryByUserId } = require('../../infrastructure/commentRepository');
const { ExcepcionUserNotFound } = require('../../exceptions/userNotFound');
const { ProductNotFound } = require('../../../products/exceptions/productNotFound');

// Mock the repository functions
jest.mock('../../infrastructure/commentRepository', () => ({
    createCommentRepository: jest.fn(),
    getCommentRepositoryByProductId: jest.fn(),
    getCommentRepositoryByUserId: jest.fn(),
}));

describe('addCommentUseCase', () => {
    const commentRequest = {
        userId: 'user1',
        productId: 'product1',
        comment: 'Great product!',
        rate: 5
    };

    it('should add a comment if product and user exist', async () => {
        getCommentRepositoryByProductId.mockResolvedValue({ id: 'product1' });
        getCommentRepositoryByUserId.mockResolvedValue({ id: 'user1' });
        createCommentRepository.mockResolvedValue({ id: 'comment1', ...commentRequest });

        const result = await addCommentUseCase(commentRequest);

        expect(getCommentRepositoryByProductId).toHaveBeenCalledWith(commentRequest.productId);
        expect(getCommentRepositoryByUserId).toHaveBeenCalledWith(commentRequest.userId);
        expect(createCommentRepository).toHaveBeenCalledWith(commentRequest);
        expect(result).toEqual({ id: 'comment1', ...commentRequest });
    });

    it('should throw ProductNotFound if the product does not exist', async () => {
        getCommentRepositoryByProductId.mockResolvedValue(null);

        await expect(addCommentUseCase(commentRequest)).rejects.toThrow(ProductNotFound);
        expect(getCommentRepositoryByProductId).toHaveBeenCalledWith(commentRequest.productId);
    });

    it('should throw ExcepcionUserNotFound if the user does not exist', async () => {
        getCommentRepositoryByProductId.mockResolvedValue({ id: 'product1' });
        getCommentRepositoryByUserId.mockResolvedValue(null);

        await expect(addCommentUseCase(commentRequest)).rejects.toThrow(ExcepcionUserNotFound);
        expect(getCommentRepositoryByProductId).toHaveBeenCalledWith(commentRequest.productId);
        expect(getCommentRepositoryByUserId).toHaveBeenCalledWith(commentRequest.userId);
    });
});
