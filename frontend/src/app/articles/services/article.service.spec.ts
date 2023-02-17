import { TestBed, waitForAsync, inject } from '@angular/core/testing';

import { ArticleService } from './article.service';
import { ArticlesComponent } from '../articles.component';
import { ListComponent } from '../components/list/list.component';
import { EditComponent } from '../components/edit/edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { Article } from '../models/article';
import * as Observable from 'rxjs';
import { AppSettingsService } from '../../app.settings';

describe('ArticleService', () => {
  let httpClientSpy: {
    get: jasmine.Spy,
    post: jasmine.Spy,
    put: jasmine.Spy,
    delete: jasmine.Spy,
  };
  let service: ArticleService;

  beforeEach(waitForAsync(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
      declarations: [
        ArticlesComponent,
        ListComponent,
        EditComponent
      ],
      imports: [
        FontAwesomeModule
        ,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        NgbModule,
        RouterModule.forRoot([], {})
      ],
      providers: [
        ArticleService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: AppSettingsService, useValue: { settings: { articlesApiUrl: 'http://localhost:4000/articles' } } },
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
    });
  }));

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
      httpClientSpy.get.and.returnValues(Observable.of<Article[]>(data));
      service = TestBed.inject(ArticleService);
    });

    it('should call http://localhost:4000/articles with no parameter', () => {

      service.getArticles('test');

      expect(httpClientSpy.get).toHaveBeenCalled();
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args.length).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toBe('http://localhost:4000/articles?category=test');
    });

    it('should return a list of articles', waitForAsync(inject([ArticleService], (articleService) => {
      articleService.getArticles().subscribe(result => {
        expect(result.length).toBe(2);
        expect(result[0]).toBe(data[0]);
        expect(result[1]).toBe(data[1]);
      });
    })));
  });

  describe('when calling getArticleById', () => {
    const data = {
      id: '1234',
      content: 'desc1',
      title: 'title1'
    } as Article;

    beforeEach(() => {
      httpClientSpy.get.and.returnValues(Observable.of<Article>(data));
      service = TestBed.inject(ArticleService);
    });

    it('should call http://localhost:4000/articles with id parameter', () => {

      service.getArticleById('1234');

      expect(httpClientSpy.get).toHaveBeenCalled();
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args.length).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toBe('http://localhost:4000/articles/1234');
    });

    it('should return a article', waitForAsync(inject([ArticleService], (articleService) => {
      articleService.getArticles().subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.id).toBe(data.id);
        expect(result.content).toBe(data.content);
        expect(result.title).toBe(data.title);
      });
    })));
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
      httpClientSpy.post.and.returnValues(Observable.of<Article>(output));
      service = TestBed.inject(ArticleService);
    });

    it('should call http://localhost:4000/articles with article parameter', () => {

      service.addArticle(input);

      expect(httpClientSpy.post).toHaveBeenCalled();
      expect(httpClientSpy.post.calls.count()).toBe(1);
      expect(httpClientSpy.post.calls.first().args.length).toBe(2);
      expect(httpClientSpy.post.calls.first().args[0]).toBe('http://localhost:4000/articles');
      expect(httpClientSpy.post.calls.first().args[1]).toBe(input);
    });

    it('should return a article', waitForAsync(inject([ArticleService], (articleService) => {
      articleService.addArticle(input).subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.id).toBe(output.id);
        expect(result.content).toBe(output.content);
        expect(result.title).toBe(output.title);
      });
    })));
  });

  describe('when calling updateArticle', () => {
    const data = {
      id: 'id1',
      content: 'desc1',
      title: 'title1'
    } as Article;

    beforeEach(() => {
      httpClientSpy.put.and.returnValues(Observable.of<Article>(data));
      service = TestBed.inject(ArticleService);
    });

    it('should call http://localhost:4000/articles with article parameter', () => {

      service.updateArticle(data);

      expect(httpClientSpy.put).toHaveBeenCalled();
      expect(httpClientSpy.put.calls.count()).toBe(1);
      expect(httpClientSpy.put.calls.first().args.length).toBe(2);
      expect(httpClientSpy.put.calls.first().args[0]).toBe('http://localhost:4000/articles');
      expect(httpClientSpy.put.calls.first().args[1]).toBe(data);
    });

    it('should return a article', waitForAsync(inject([ArticleService], (articleService) => {
      articleService.updateArticle(data).subscribe(result => {
        expect(result).toBeTruthy();
        expect(result).toBe(data);
      });
    })));
  });

  describe('when calling deleteArticle', () => {

    beforeEach(() => {
      httpClientSpy.delete.and.callThrough();
      service = TestBed.inject(ArticleService);
    });

    it('should call http://localhost:4000/articles with article parameter', () => {

      service.deleteArticle('id');

      expect(httpClientSpy.delete).toHaveBeenCalled();
      expect(httpClientSpy.delete.calls.count()).toBe(1);
      expect(httpClientSpy.delete.calls.first().args.length).toBe(1);
      expect(httpClientSpy.delete.calls.first().args[0]).toBe('http://localhost:4000/articles/id');
    });
  });
});
