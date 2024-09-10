const { getAvgRatingByProductIdUseCase } = require('../calculate-avgRating');
const { getCommentRepositoryByProductId } = require('../../infrastructure/commentRepository');
const { ExcepcionProductWithoutComments } = require('../../exceptions/ProductWithoutComments');


jest.mock('../../infrastructure/commentRepository', () => ({
    getCommentRepositoryByProductId: jest.fn(),
}));

describe('getAvgRatingByProductIdUseCase', () => {
    it('should return the average rating of comments for a product', async () => {
        const comments = [
            { rate: 5 },
            { rate: 4 },
            { rate: 3 },
        ];
        getCommentRepositoryByProductId.mockResolvedValue(comments);

        const avgRating = await getAvgRatingByProductIdUseCase('product1');

        expect(avgRating).toBe(4);
        expect(getCommentRepositoryByProductId).toHaveBeenCalledWith('product1');
    });

    it('should throw ExcepcionProductWithoutComments if no comments are found', async () => {
        getCommentRepositoryByProductId.mockResolvedValue([]);

        await expect(getAvgRatingByProductIdUseCase('product1')).rejects.toThrow(ExcepcionProductWithoutComments);
        expect(getCommentRepositoryByProductId).toHaveBeenCalledWith('product1');
    });

    it('should throw ExcepcionProductWithoutComments if comments is null or undefined', async () => {
        getCommentRepositoryByProductId.mockResolvedValue(null);

        await expect(getAvgRatingByProductIdUseCase('product1')).rejects.toThrow(ExcepcionProductWithoutComments);
        expect(getCommentRepositoryByProductId).toHaveBeenCalledWith('product1');
    });

    it('should handle an empty product ID', async () => {
        getCommentRepositoryByProductId.mockResolvedValue([]);

        await expect(getAvgRatingByProductIdUseCase('')).rejects.toThrow(ExcepcionProductWithoutComments);
        expect(getCommentRepositoryByProductId).toHaveBeenCalledWith('');
    });
});
