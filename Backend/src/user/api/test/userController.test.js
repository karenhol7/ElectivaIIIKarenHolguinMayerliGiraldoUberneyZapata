
const request = require('supertest');
const express = require('express');
const { singUp, login } = require('../user.controller');
const {
    createUserUseCase,
  } = require('../../application/create-user');
  const {
    authUserUseCase,
  } = require('../../application/auth-user');
  const {
    ExcepcionUserParameterAlreadyExist,
  } = require('../../exceptions/userParameterAlreadyExist');
  const {
    ExcepcionUserNameNotFound,
  } = require('../../exceptions/userNameNotFound');
  const {
    ExcepcionWrongCredentials,
  } = require('../../exceptions/wrongCredentials');
  
  // Configura la aplicación Express
  const app = express();
  app.use(express.json());
  app.post('/signup', singUp);
  app.post('/login', login);
  
  // Mock de los casos de uso
  jest.mock('../../application/create-user');
  jest.mock('../../application/auth-user');
  
  describe('Auth Controller', () => {
    describe('POST /signup', () => {
      it('should create a new user and return 201', async () => {
        const newUser = { id: '1', name: 'testUser' };
        createUserUseCase.mockResolvedValue(newUser);
  
        const response = await request(app)
          .post('/signup')
          .send({ name: 'testUser', password: 'password' });
  
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ user: newUser });
      });
  
      it('should return 400 if user parameter already exists', async () => {
        createUserUseCase.mockRejectedValue(new ExcepcionUserParameterAlreadyExist('User already exists'));
  
        const response = await request(app)
          .post('/signup')
          .send({ name: 'existingUser', password: 'password' });
  
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'user with parameter: User already exists already exist' });
      });
  
      it('should return 500 for other errors', async () => {
        createUserUseCase.mockRejectedValue(new Error());
  
        const response = await request(app)
          .post('/signup')
          .send({ name: 'testUser', password: 'password' });
  
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: {} });
      });
    });
  
    describe('POST /login', () => {
      it('should authenticate user and return 201 with token', async () => {
        const userWithToken = { id: '1', name: 'testUser', token: 'abc123' };
        authUserUseCase.mockResolvedValue(userWithToken);
  
        const response = await request(app)
          .post('/login')
          .send({ name: 'testUser', password: 'password' });
  
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ userInfo: userWithToken });
      });
  
      it('should return 400 if username not found', async () => {
        authUserUseCase.mockRejectedValue(new ExcepcionUserNameNotFound('Username not found'));
  
        const response = await request(app)
          .post('/login')
          .send({ name: 'unknownUser', password: 'password' });
  
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'userName: Username not found not found' });
      });
  
      it('should return 400 if wrong credentials', async () => {
        authUserUseCase.mockRejectedValue(new ExcepcionWrongCredentials('Wrong credentials'));
  
        const response = await request(app)
          .post('/login')
          .send({ name: 'testUser', password: 'wrongpassword' });
  
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'WRONG CREDENTIALS' });
      });
  
      it('should return 500 for other errors', async () => {
        authUserUseCase.mockRejectedValue(new Error());
  
        const response = await request(app)
          .post('/login')
          .send({ name: 'testUser', password: 'password' });
  
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: {} });
      });
    });
  });
