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
vi.mock('./article.controller', () => {
  return {
    ArticleController: vi.fn().mockImplementation(() => {
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
import articleRoutes from './article.routes';

describe('ArticleRoutes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', articleRoutes);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('GET / should return all articles', async () => {
    const mockArticles = [{ title: 'Article 1' }, { title: 'Article 2' }];
    getAllMock.mockResolvedValue(mockArticles);

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockArticles);
    expect(getAllMock).toHaveBeenCalled();
  });

  it('GET / with category query should filter articles', async () => {
    const mockArticles = [{ title: 'Article 1', category: 'Tech' }];
    getAllMock.mockResolvedValue(mockArticles);

    const response = await request(app).get('/?category=Tech');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockArticles);
    expect(getAllMock).toHaveBeenCalledWith('Tech');
  });

  it('GET /:id should return a specific article', async () => {
    const mockArticle = { title: 'Article 1' };
    getByIdMock.mockResolvedValue(mockArticle);

    const response = await request(app).get('/123');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockArticle);
    expect(getByIdMock).toHaveBeenCalledWith('123');
  });

  it('POST / should create a new article', async () => {
    const newArticle = { title: 'New Article' };
    const savedArticle = { _id: '1', ...newArticle };
    addMock.mockResolvedValue(savedArticle);

    const response = await request(app).post('/').send(newArticle);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(savedArticle);
    expect(addMock).toHaveBeenCalledWith(newArticle);
  });

  it('PUT / should update an article', async () => {
    const updateData = { _id: '1', title: 'Updated Article' };
    updateMock.mockResolvedValue(updateData);

    const response = await request(app).put('/').send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updateData);
    expect(updateMock).toHaveBeenCalledWith(updateData);
  });

  it('DELETE /:id should delete an article', async () => {
    const deletedArticle = { _id: '1', title: 'Deleted Article' };
    deleteMock.mockResolvedValue(deletedArticle);

    const response = await request(app).delete('/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(deletedArticle);
    expect(deleteMock).toHaveBeenCalledWith('1');
  });
});
