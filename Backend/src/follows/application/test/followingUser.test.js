const { 
    followUserUseCase, 
    getFollowersUseCase, 
    getFollowingsUseCase, 
    unfollowUseCase 
} = require('../following-user');
const { 
    followUser, 
    getFollowersRepository, 
    getFollowingsRepository, 
    unfollowUser 
} = require('../../infrastructure/followRepository');

jest.mock('../../infrastructure/followRepository', () => ({
    followUser: jest.fn(),
    getFollowersRepository: jest.fn(),
    getFollowingsRepository: jest.fn(),
    unfollowUser: jest.fn()
}));

describe('Following Use Cases', () => {
    const userId = 'testUserId';
    const followedUserId = 'followedUserId';
    const unFollowedUserId = 'unFollowedUserId';

    test('followUserUseCase - should follow a user', async () => {
        followUser.mockResolvedValue({ success: true });

        const result = await followUserUseCase(userId, followedUserId);

        expect(result).toEqual({ success: true });
        expect(followUser).toHaveBeenCalledWith(userId, followedUserId);
    });

    test('followUserUseCase - should handle errors', async () => {
        followUser.mockRejectedValue(new Error('Failed to follow user'));

        await expect(followUserUseCase(userId, followedUserId)).rejects.toThrow('Failed to follow user');
    });

    test('getFollowersUseCase - should get followers', async () => {
        getFollowersRepository.mockResolvedValue([{ id: 'follower1' }, { id: 'follower2' }]);

        const result = await getFollowersUseCase(userId);

        expect(result).toEqual([{ id: 'follower1' }, { id: 'follower2' }]);
        expect(getFollowersRepository).toHaveBeenCalledWith(userId);
    });

    test('getFollowersUseCase - should handle errors', async () => {
        getFollowersRepository.mockRejectedValue(new Error('Failed to get followers'));

        await expect(getFollowersUseCase(userId)).rejects.toThrow('Failed to get followers');
    });

    test('getFollowingsUseCase - should get followings', async () => {
        getFollowingsRepository.mockResolvedValue([{ id: 'following1' }, { id: 'following2' }]);

        const result = await getFollowingsUseCase(userId);

        expect(result).toEqual([{ id: 'following1' }, { id: 'following2' }]);
        expect(getFollowingsRepository).toHaveBeenCalledWith(userId);
    });

    test('getFollowingsUseCase - should handle errors', async () => {
        getFollowingsRepository.mockRejectedValue(new Error('Failed to get followings'));

        await expect(getFollowingsUseCase(userId)).rejects.toThrow('Failed to get followings');
    });

    test('unfollowUseCase - should unfollow a user', async () => {
        unfollowUser.mockResolvedValue({ success: true });

        const result = await unfollowUseCase(userId, unFollowedUserId);

        expect(result).toEqual({ success: true });
        expect(unfollowUser).toHaveBeenCalledWith(userId, unFollowedUserId);
    });

    test('unfollowUseCase - should handle errors', async () => {
        unfollowUser.mockRejectedValue(new Error('Failed to unfollow user'));

        await expect(unfollowUseCase(userId, unFollowedUserId)).rejects.toThrow('Failed to unfollow user');
    });
});
