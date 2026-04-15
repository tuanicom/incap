import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import express from 'express';
import request from 'supertest';

const mocks = vi.hoisted(() => ({
  getByArticleMock: vi.fn(),
  addMock: vi.fn(),
  updateMock: vi.fn(),
  deleteMock: vi.fn()
}));

vi.mock('./comment.controller', () => ({
  CommentController: vi.fn(function MockedCommentController() {
    return {
      getByArticle: mocks.getByArticleMock,
      add: mocks.addMock,
      update: mocks.updateMock,
      delete: mocks.deleteMock
    };
  })
}));

import commentRoutes from './comment.routes';

describe('CommentRoutes', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', commentRoutes);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('GET /articles/:articleId/comments should return article comments', async () => {
    const comments = [{ _id: '1', text: 'First comment' }];
    mocks.getByArticleMock.mockResolvedValue(comments);

    const response = await request(app).get('/articles/article-1/comments');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(comments);
    expect(mocks.getByArticleMock).toHaveBeenCalledWith('article-1');
  });

  it('POST /articles/:articleId/comments should create a comment', async () => {
    const payload = { text: 'New comment', authorId: 'user-1' };
    const savedComment = { _id: '1', articleId: 'article-1', ...payload };
    mocks.addMock.mockResolvedValue(savedComment);

    const response = await request(app).post('/articles/article-1/comments').send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(savedComment);
    expect(mocks.addMock).toHaveBeenCalledWith('article-1', payload);
  });

  it('PUT /comments/:id should force the route id into the payload', async () => {
    const updatedComment = { _id: 'comment-1', text: 'Updated comment' };
    mocks.updateMock.mockResolvedValue(updatedComment);

    const response = await request(app)
      .put('/comments/comment-1')
      .send({ _id: 'ignored-id', text: 'Updated comment' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedComment);
    expect(mocks.updateMock).toHaveBeenCalledWith({ _id: 'comment-1', text: 'Updated comment' });
  });

  it('DELETE /comments/:id should delete a comment', async () => {
    mocks.deleteMock.mockResolvedValue(undefined);

    const response = await request(app).delete('/comments/comment-1');

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
    expect(mocks.deleteMock).toHaveBeenCalledWith('comment-1');
  });
});
