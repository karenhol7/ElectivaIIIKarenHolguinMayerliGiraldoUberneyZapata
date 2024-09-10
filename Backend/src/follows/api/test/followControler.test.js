const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const {
    followUserController,
    getFollowers,
    getFollowings,
    unfollow
} = require('../follow.controller');

jest.mock('../../application/following-user', () => ({
    getFollowersUseCase: jest.fn(),
    getFollowingsUseCase: jest.fn(),
    followUserUseCase: jest.fn(),
    unfollowUseCase: jest.fn()
}));

const { getFollowersUseCase, getFollowingsUseCase, followUserUseCase, unfollowUseCase } =
 require('../../application/following-user');

const app = express();
app.use(express.json());

app.post('/follow', followUserController);
app.post('/unfollow', unfollow);
app.get('/followers/:id', getFollowers);
app.get('/followings/:id', getFollowings);

describe('Following Controller', () => {
    let token;
    const secretKey = 'testsecret';

    beforeAll(() => {
        process.env.SECRET_KEY = secretKey;
        token = jwt.sign({ userId: 'testUserId' }, secretKey);
    });

    afterAll(() => {
        delete process.env.SECRET_KEY;
    });

    test('followUserController - should follow a user', async () => {
        followUserUseCase.mockResolvedValue({ success: true });

        const response = await request(app)
            .post('/follow')
            .set('Authorization', token)
            .send({ userIdToFollow: 'anotherUserId' });

        expect(response.status).toBe(200);
        expect(response.body.response).toEqual({ success: true });
        expect(followUserUseCase).toHaveBeenCalledWith('testUserId', 'anotherUserId');
    });

    test('unfollow - should unfollow a user', async () => {
        unfollowUseCase.mockResolvedValue({ success: true });

        const response = await request(app)
            .post('/unfollow')
            .set('Authorization', token)
            .send({ userIdToUnFollow: 'anotherUserId' });

        expect(response.status).toBe(200);
        expect(response.body.response).toEqual({ success: true });
        expect(unfollowUseCase).toHaveBeenCalledWith('testUserId', 'anotherUserId');
    });

    test('getFollowers - should get followers of a user', async () => {
        getFollowersUseCase.mockResolvedValue([{ id: 'follower1' }, { id: 'follower2' }]);

        const response = await request(app)
            .get('/followers/testUserId');

        expect(response.status).toBe(200);
        expect(response.body.followers).toEqual([{ id: 'follower1' }, { id: 'follower2' }]);
        expect(getFollowersUseCase).toHaveBeenCalledWith('testUserId');
    });

    test('getFollowings - should get followings of a user', async () => {
        getFollowingsUseCase.mockResolvedValue([{ id: 'following1' }, { id: 'following2' }]);

        const response = await request(app)
            .get('/followings/testUserId');

        expect(response.status).toBe(200);
        expect(response.body.followings).toEqual([{ id: 'following1' }, { id: 'following2' }]);
        expect(getFollowingsUseCase).toHaveBeenCalledWith('testUserId');
    });

    test('followUserController - should handle errors correctly', async () => {
        followUserUseCase.mockRejectedValue(new Error('Failed to follow user'));

        const response = await request(app)
            .post('/follow')
            .set('Authorization', token)
            .send({ userIdToFollow: 'anotherUserId' });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Failed to follow user');
    });

    test('unfollow - should handle errors correctly', async () => {
        unfollowUseCase.mockRejectedValue(new Error('Failed to unfollow user'));

        const response = await request(app)
            .post('/unfollow')
            .set('Authorization', token)
            .send({ userIdToUnFollow: 'anotherUserId' });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Failed to unfollow user');
    });
});
