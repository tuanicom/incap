import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';

// Define the mocks using vi.hoisted to ensure they are available before imports
const mocks = vi.hoisted(() => {
  return {
    getAllMock: vi.fn(),
    getByIdMock: vi.fn(),
    addMock: vi.fn(),
    updateMock: vi.fn(),
    deleteMock: vi.fn()
  };
});

const { getAllMock, getByIdMock, addMock, updateMock, deleteMock } = mocks;

// Mock the controller class module
vi.mock('./user.controller', () => {
  return {
    UserController: vi.fn().mockImplementation(() => {
      return {
        getAll: mocks.getAllMock,
        getById: mocks.getByIdMock,
        add: mocks.addMock,
        update: mocks.updateMock,
        delete: mocks.deleteMock
      };
    })
  };
});

// Import the router after mocking
import userRoutes from './user.routes';

describe('UserRoutes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', userRoutes);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('GET / should return all users', async () => {
    const mockUsers = [{ name: 'User 1' }, { name: 'User 2' }];
    getAllMock.mockResolvedValue(mockUsers);

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
    expect(getAllMock).toHaveBeenCalled();
  });

  it('GET /:id should return a specific user', async () => {
    const mockUser = { name: 'User 1' };
    getByIdMock.mockResolvedValue(mockUser);

    const response = await request(app).get('/123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(getByIdMock).toHaveBeenCalledWith('123');
  });

  it('POST / should create a new user', async () => {
    const newUser = { name: 'New User' };
    const savedUser = { _id: '1', ...newUser };
    addMock.mockResolvedValue(savedUser);

    const response = await request(app).post('/').send(newUser);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(savedUser);
    expect(addMock).toHaveBeenCalledWith(newUser);
  });

  it('PUT / should update a user', async () => {
    const updateData = { _id: '1', name: 'Updated User' };
    updateMock.mockResolvedValue(updateData);

    const response = await request(app).put('/').send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updateData);
    expect(updateMock).toHaveBeenCalledWith(updateData);
  });

  it('DELETE /:id should delete a user', async () => {
    const deletedUser = { _id: '1', name: 'Deleted User' };
    deleteMock.mockResolvedValue(deletedUser);

    const response = await request(app).delete('/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(deletedUser);
    expect(deleteMock).toHaveBeenCalledWith('1');
  });
});
