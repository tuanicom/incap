import type { Mock } from "vitest";
import { TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { ArticlesComponent } from '../articles.component';
import { ListComponent } from '../components/list/list.component';
import { EditComponent } from '../components/edit/edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { Article } from '../models/article';
import { lastValueFrom } from 'rxjs';
import * as Observable from 'rxjs';
import { AppSettingsService } from '../../app.settings';

describe('ArticleService', () => {
    let httpClientSpy: {
        get: Mock;
        post: Mock;
        put: Mock;
        delete: Mock;
    };
    let service: ArticleService;

    beforeEach(async () => {
        httpClientSpy = {
            get: vi.fn().mockName("HttpClient.get"),
            post: vi.fn().mockName("HttpClient.post"),
            put: vi.fn().mockName("HttpClient.put"),
            delete: vi.fn().mockName("HttpClient.delete")
        };

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [FontAwesomeModule,
                ReactiveFormsModule,
                BrowserModule,
                NgbModule,
                RouterModule.forRoot([], {}),
                ArticlesComponent,
                ListComponent,
                EditComponent],
            providers: [
                ArticleService,
                { provide: HttpClient, useValue: httpClientSpy },
                { provide: AppSettingsService, useValue: { settings: { articlesApiUrl: 'http://localhost:4000/articles' } } },
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();
    });

    it('should be created', () => {
        service = TestBed.inject(ArticleService);
        expect(service).toBeTruthy();
    });

    describe('when calling getArticles', () => {
        const data = [{
                id: '1234',
                content: 'desc1',
                title: 'title1'
            }, {
                id: '5678',
                content: 'desc2',
                title: 'title2'
            }] as Article[];

        beforeEach(() => {
            httpClientSpy.get.mockReturnValueOnce(Observable.of<Article[]>(data));
            service = TestBed.inject(ArticleService);
        });

        it('should call http://localhost:4000/articles?category=test', () => {

            service.getArticles('test');

            expect(httpClientSpy.get).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.get).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0].length).toBe(2);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0][0]).toBe('http://localhost:4000/articles');
            expect(vi.mocked(httpClientSpy.get).mock.calls[0][1].params.keys()).toEqual(['category']);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0][1].params.get('category')).toBe('test');
        });

        it('should return a list of articles', async () => {
            const articleService = TestBed.inject(ArticleService);
            const result = await lastValueFrom(articleService.getArticles('test'));
            expect(result.length).toBe(2);
            expect(result[0]).toBe(data[0]);
            expect(result[1]).toBe(data[1]);
        });
    });

    describe('when calling getArticleById', () => {
        const data = {
            id: '1234',
            content: 'desc1',
            title: 'title1'
        } as Article;

        beforeEach(() => {
            httpClientSpy.get.mockReturnValueOnce(Observable.of<Article>(data));
            service = TestBed.inject(ArticleService);
        });

        it('should call http://localhost:4000/articles with id parameter', () => {

            service.getArticleById('1234');

            expect(httpClientSpy.get).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.get).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0].length).toBe(1);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0][0]).toBe('http://localhost:4000/articles/1234');
        });

        it('should return a article', async () => {
            const articleService = TestBed.inject(ArticleService);
            const result = await lastValueFrom(articleService.getArticleById('1234'));
            expect(result).toBeTruthy();
            expect(result.id).toBe(data.id);
            expect(result.content).toBe(data.content);
            expect(result.title).toBe(data.title);
        });
    });

    describe('when calling addArticle', () => {
        const input = {
            content: 'desc1',
            title: 'title1'
        } as Article;

        const output = {
            id: 'id1',
            content: 'desc1',
            title: 'title1'
        } as Article;


        beforeEach(() => {
            httpClientSpy.post.mockReturnValueOnce(Observable.of<Article>(output));
            service = TestBed.inject(ArticleService);
        });

        it('should call http://localhost:4000/articles with article parameter', () => {

            service.addArticle(input);

            expect(httpClientSpy.post).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.post).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.post).mock.calls[0].length).toBe(2);
            expect(vi.mocked(httpClientSpy.post).mock.calls[0][0]).toBe('http://localhost:4000/articles');
            expect(vi.mocked(httpClientSpy.post).mock.calls[0][1]).toBe(input);
        });

        it('should return a article', async () => {
            const articleService = TestBed.inject(ArticleService);
            const result = await lastValueFrom(articleService.addArticle(input));
            expect(result).toBeTruthy();
            expect(result.id).toBe(output.id);
            expect(result.content).toBe(output.content);
            expect(result.title).toBe(output.title);
        });
    });

    describe('when calling updateArticle', () => {
        const data = {
            id: 'id1',
            content: 'desc1',
            title: 'title1'
        } as Article;

        beforeEach(() => {
            httpClientSpy.put.mockReturnValueOnce(Observable.of<Article>(data));
            service = TestBed.inject(ArticleService);
        });

        it('should call http://localhost:4000/articles with article parameter', () => {

            service.updateArticle(data);

            expect(httpClientSpy.put).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.put).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.put).mock.calls[0].length).toBe(2);
            expect(vi.mocked(httpClientSpy.put).mock.calls[0][0]).toBe('http://localhost:4000/articles');
            expect(vi.mocked(httpClientSpy.put).mock.calls[0][1]).toBe(data);
        });

        it('should return a article', async () => {
            const articleService = TestBed.inject(ArticleService);
            const result = await lastValueFrom(articleService.updateArticle(data));
            expect(result).toBeTruthy();
            expect(result).toBe(data);
        });
    });

    describe('when calling deleteArticle', () => {

        beforeEach(() => {
            httpClientSpy.delete;
            service = TestBed.inject(ArticleService);
        });

        it('should call http://localhost:4000/articles with article parameter', () => {

            service.deleteArticle('id');

            expect(httpClientSpy.delete).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.delete).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.delete).mock.calls[0].length).toBe(1);
            expect(vi.mocked(httpClientSpy.delete).mock.calls[0][0]).toBe('http://localhost:4000/articles/id');
        });
    });
});
