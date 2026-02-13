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
vi.mock('./category.controller', () => {
  return {
    CategoryController: vi.fn(function() {
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
import categoryRoutes from './category.routes';

describe('CategoryRoutes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', categoryRoutes);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('GET / should return all categories', async () => {
    const mockCategories = [{ title: 'Category 1' }, { title: 'Category 2' }];
    getAllMock.mockResolvedValue(mockCategories);

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategories);
    expect(getAllMock).toHaveBeenCalled();
  });

  it('GET /:id should return a specific category', async () => {
    const mockCategory = { title: 'Category 1' };
    getByIdMock.mockResolvedValue(mockCategory);

    const response = await request(app).get('/123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategory);
    expect(getByIdMock).toHaveBeenCalledWith('123');
  });

  it('POST / should create a new category', async () => {
    const newCategory = { title: 'New Category' };
    const savedCategory = { _id: '1', ...newCategory };
    addMock.mockResolvedValue(savedCategory);

    const response = await request(app).post('/').send(newCategory);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(savedCategory);
    expect(addMock).toHaveBeenCalledWith(newCategory);
  });

  it('PUT / should update a category', async () => {
    const updateData = { _id: '1', title: 'Updated Category' };
    updateMock.mockResolvedValue(updateData);

    const response = await request(app).put('/').send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updateData);
    expect(updateMock).toHaveBeenCalledWith(updateData);
  });

  it('DELETE /:id should delete a category', async () => {
    const deletedCategory = { _id: '1', title: 'Deleted Category' };
    deleteMock.mockResolvedValue(deletedCategory);

    const response = await request(app).delete('/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(deletedCategory);
    expect(deleteMock).toHaveBeenCalledWith('1');
  });
});
