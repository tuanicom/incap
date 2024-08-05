import { TestBed, waitForAsync, inject } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { CategoriesComponent } from '../categories.component';
import { ListComponent } from '../components/list/list.component';
import { EditComponent } from '../components/edit/edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { Category } from '../models/category';
import * as Observable from 'rxjs';
import { AppSettingsService } from 'src/app/app.settings';

describe('CategoryService', () => {
  let httpClientSpy: {
    get: jasmine.Spy,
    post: jasmine.Spy,
    put: jasmine.Spy,
    delete: jasmine.Spy,
  };
  let service: CategoryService;

  beforeEach(waitForAsync(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
    declarations: [
        CategoriesComponent,
        ListComponent,
        EditComponent
    ],
    imports: [FontAwesomeModule,
        ReactiveFormsModule,
        BrowserModule,
        NgbModule,
        RouterModule.forRoot([], {})],
    providers: [
        CategoryService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: AppSettingsService, useValue: { settings: { categoriesApiUrl: 'http://localhost:4000/categories' } } },
        { provide: APP_BASE_HREF, useValue: '/' }
    ]
});
  }));

  it('should be created', () => {
    service = TestBed.inject(CategoryService);
    expect(service).toBeTruthy();
  });

  describe('when calling getCategories', () => {
    const data = [{
      id: '1234',
      description: 'desc1',
      title: 'title1'
    }, {
      id: '5678',
      description: 'desc2',
      title: 'title2'
    }] as Category[];

    beforeEach(() => {
      httpClientSpy.get.and.returnValues(Observable.of<Category[]>(data));
      service = TestBed.inject(CategoryService);
    });

    it('should call http://localhost:4000/categories with no parameter', () => {

      service.getCategories();

      expect(httpClientSpy.get).toHaveBeenCalled();
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args.length).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toBe('http://localhost:4000/categories');
    });

    it('should return a list of categories', waitForAsync(inject([CategoryService], (categoryService) => {
      categoryService.getCategories().subscribe(result => {
        expect(result.length).toBe(2);
        expect(result[0]).toBe(data[0]);
        expect(result[1]).toBe(data[1]);
      });
    })));
  });

  describe('when calling getCategoryById', () => {
    const data = {
      id: '1234',
      description: 'desc1',
      title: 'title1'
    } as Category;

    beforeEach(() => {
      httpClientSpy.get.and.returnValues(Observable.of<Category>(data));
      service = TestBed.inject(CategoryService);
    });

    it('should call http://localhost:4000/categories with id parameter', () => {

      service.getCategoryById('1234');

      expect(httpClientSpy.get).toHaveBeenCalled();
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args.length).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toBe('http://localhost:4000/categories/1234');
    });

    it('should return a category', waitForAsync(inject([CategoryService], (categoryService) => {
      categoryService.getCategories().subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.id).toBe(data.id);
        expect(result.description).toBe(data.description);
        expect(result.title).toBe(data.title);
      });
    })));
  });

  describe('when calling addCategory', () => {
    const input = {
      description: 'desc1',
      title: 'title1'
    } as Category;

    const output = {
      id: 'id1',
      description: 'desc1',
      title: 'title1'
    } as Category;


    beforeEach(() => {
      httpClientSpy.post.and.returnValues(Observable.of<Category>(output));
      service = TestBed.inject(CategoryService);
    });

    it('should call http://localhost:4000/categories with category parameter', () => {

      service.addCategory(input);

      expect(httpClientSpy.post).toHaveBeenCalled();
      expect(httpClientSpy.post.calls.count()).toBe(1);
      expect(httpClientSpy.post.calls.first().args.length).toBe(2);
      expect(httpClientSpy.post.calls.first().args[0]).toBe('http://localhost:4000/categories');
      expect(httpClientSpy.post.calls.first().args[1]).toBe(input);
    });

    it('should return a category', waitForAsync(inject([CategoryService], (categoryService) => {
      categoryService.addCategory(input).subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.id).toBe(output.id);
        expect(result.description).toBe(output.description);
        expect(result.title).toBe(output.title);
      });
    })));
  });

  describe('when calling updateCategory', () => {
    const data = {
      id: 'id1',
      description: 'desc1',
      title: 'title1'
    } as Category;

    beforeEach(() => {
      httpClientSpy.put.and.returnValues(Observable.of<Category>(data));
      service = TestBed.inject(CategoryService);
    });

    it('should call http://localhost:4000/categories with category parameter', () => {

      service.updateCategory(data);

      expect(httpClientSpy.put).toHaveBeenCalled();
      expect(httpClientSpy.put.calls.count()).toBe(1);
      expect(httpClientSpy.put.calls.first().args.length).toBe(2);
      expect(httpClientSpy.put.calls.first().args[0]).toBe('http://localhost:4000/categories');
      expect(httpClientSpy.put.calls.first().args[1]).toBe(data);
    });

    it('should return a category', waitForAsync(inject([CategoryService], (categoryService) => {
      categoryService.updateCategory(data).subscribe(result => {
        expect(result).toBeTruthy();
        expect(result).toBe(data);
      });
    })));
  });

  describe('when calling deleteCategory', () => {

    beforeEach(() => {
      httpClientSpy.delete.and.callThrough();
      service = TestBed.inject(CategoryService);
    });

    it('should call http://localhost:4000/categories with category parameter', () => {

      service.deleteCategory('id');

      expect(httpClientSpy.delete).toHaveBeenCalled();
      expect(httpClientSpy.delete.calls.count()).toBe(1);
      expect(httpClientSpy.delete.calls.first().args.length).toBe(1);
      expect(httpClientSpy.delete.calls.first().args[0]).toBe('http://localhost:4000/categories/id');
    });
  });
});
