import { TestBed } from '@angular/core/testing';
import type { Mock } from 'vitest';
import { CommentService } from './comment.service';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from 'src/app/app.settings';
import * as Observable from 'rxjs';
import { lastValueFrom } from 'rxjs';

describe('CommentService', () => {
  let httpClientSpy: { get: Mock; post: Mock; put: Mock; delete: Mock };
  let service: CommentService;

  beforeEach(async () => {
    httpClientSpy = {
      get: vi.fn().mockName('HttpClient.get'),
      post: vi.fn().mockName('HttpClient.post'),
      put: vi.fn().mockName('HttpClient.put'),
      delete: vi.fn().mockName('HttpClient.delete'),
    };

    await TestBed.configureTestingModule({
      providers: [
        CommentService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: AppSettingsService, useValue: { settings: { articlesApiUrl: 'http://localhost:4000/articles' } } }
      ]
    }).compileComponents();
  });

  it('should be created', () => {
    service = TestBed.inject(CommentService);
    expect(service).toBeTruthy();
  });

  describe('listForArticle', () => {
    const data = [{ _id: '1', text: 'a' }];
    beforeEach(() => {
      httpClientSpy.get.mockReturnValueOnce(Observable.of(data));
      service = TestBed.inject(CommentService);
    });

    it('should call correct url', () => {
      service.listForArticle('article1');
      expect(httpClientSpy.get).toHaveBeenCalled();
      expect(vi.mocked(httpClientSpy.get).mock.calls[0][0]).toBe('http://localhost:4000/articles/article1/comments');
    });

    it('should return list', async () => {
      const result = await lastValueFrom(service.listForArticle('article1'));
      expect(result).toBe(data);
    });
  });

  describe('create', () => {
    const payload = { text: 'new' };
    beforeEach(() => {
      httpClientSpy.post.mockReturnValueOnce(Observable.of({ _id: '1', ...payload }));
      service = TestBed.inject(CommentService);
    });

    it('should post to correct url', () => {
      service.create('article1', payload);
      expect(httpClientSpy.post).toHaveBeenCalled();
      expect(vi.mocked(httpClientSpy.post).mock.calls[0][0]).toBe('http://localhost:4000/articles/article1/comments');
    });
  });

  describe('update', () => {
    beforeEach(() => {
      httpClientSpy.put.mockReturnValueOnce(Observable.of({ _id: '1', text: 'u' }));
      service = TestBed.inject(CommentService);
    });

    it('should call put on /comments/:id', () => {
      service.update('1', { text: 'u' });
      expect(httpClientSpy.put).toHaveBeenCalled();
      expect(vi.mocked(httpClientSpy.put).mock.calls[0][0]).toBe('/comments/1');
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      httpClientSpy.delete.mockReturnValueOnce(Observable.of({}));
      service = TestBed.inject(CommentService);
    });

    it('should call delete on /comments/:id', () => {
      service.delete('1');
      expect(httpClientSpy.delete).toHaveBeenCalled();
      expect(vi.mocked(httpClientSpy.delete).mock.calls[0][0]).toBe('/comments/1');
    });
  });
});
