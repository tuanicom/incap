import type { Mock } from "vitest";
import { TestBed } from '@angular/core/testing';

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
import { lastValueFrom } from 'rxjs';
import * as Observable from 'rxjs';
import { AppSettingsService } from 'src/app/app.settings';

describe('CategoryService', () => {
    let httpClientSpy: {
        get: Mock;
        post: Mock;
        put: Mock;
        delete: Mock;
    };
    let service: CategoryService;

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
                CategoriesComponent,
                ListComponent,
                EditComponent],
            providers: [
                CategoryService,
                { provide: HttpClient, useValue: httpClientSpy },
                { provide: AppSettingsService, useValue: { settings: { categoriesApiUrl: 'http://localhost:4000/categories' } } },
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();
    });

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
            httpClientSpy.get.mockReturnValueOnce(Observable.of<Category[]>(data));
            service = TestBed.inject(CategoryService);
        });

        it('should call http://localhost:4000/categories with no parameter', () => {

            service.getCategories();

            expect(httpClientSpy.get).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.get).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0].length).toBe(1);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0][0]).toBe('http://localhost:4000/categories');
        });

        it('should return a list of categories', async () => {
            const categoryService = TestBed.inject(CategoryService);
            const result = await lastValueFrom(categoryService.getCategories());
            expect(result.length).toBe(2);
            expect(result[0]).toBe(data[0]);
            expect(result[1]).toBe(data[1]);
        });
    });

    describe('when calling getCategoryById', () => {
        const data = {
            id: '1234',
            description: 'desc1',
            title: 'title1'
        } as Category;

        beforeEach(() => {
            httpClientSpy.get.mockReturnValueOnce(Observable.of<Category>(data));
            service = TestBed.inject(CategoryService);
        });

        it('should call http://localhost:4000/categories with id parameter', () => {

            service.getCategoryById('1234');

            expect(httpClientSpy.get).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.get).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0].length).toBe(1);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0][0]).toBe('http://localhost:4000/categories/1234');
        });

        it('should return a category', async () => {
            const categoryService = TestBed.inject(CategoryService);
            const result = await lastValueFrom(categoryService.getCategoryById('1234'));
            expect(result).toBeTruthy();
            expect(result.id).toBe(data.id);
            expect(result.description).toBe(data.description);
            expect(result.title).toBe(data.title);
        });
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
            httpClientSpy.post.mockReturnValueOnce(Observable.of<Category>(output));
            service = TestBed.inject(CategoryService);
        });

        it('should call http://localhost:4000/categories with category parameter', () => {

            service.addCategory(input);

            expect(httpClientSpy.post).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.post).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.post).mock.calls[0].length).toBe(2);
            expect(vi.mocked(httpClientSpy.post).mock.calls[0][0]).toBe('http://localhost:4000/categories');
            expect(vi.mocked(httpClientSpy.post).mock.calls[0][1]).toBe(input);
        });

        it('should return a category', async () => {
            const categoryService = TestBed.inject(CategoryService);
            const result = await lastValueFrom(categoryService.addCategory(input));
            expect(result).toBeTruthy();
            expect(result.id).toBe(output.id);
            expect(result.description).toBe(output.description);
            expect(result.title).toBe(output.title);
        });
    });

    describe('when calling updateCategory', () => {
        const data = {
            id: 'id1',
            description: 'desc1',
            title: 'title1'
        } as Category;

        beforeEach(() => {
            httpClientSpy.put.mockReturnValueOnce(Observable.of<Category>(data));
            service = TestBed.inject(CategoryService);
        });

        it('should call http://localhost:4000/categories with category parameter', () => {

            service.updateCategory(data);

            expect(httpClientSpy.put).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.put).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.put).mock.calls[0].length).toBe(2);
            expect(vi.mocked(httpClientSpy.put).mock.calls[0][0]).toBe('http://localhost:4000/categories');
            expect(vi.mocked(httpClientSpy.put).mock.calls[0][1]).toBe(data);
        });

        it('should return a category', async () => {
            const categoryService = TestBed.inject(CategoryService);
            const result = await lastValueFrom(categoryService.updateCategory(data));
            expect(result).toBeTruthy();
            expect(result).toBe(data);
        });
    });

    describe('when calling deleteCategory', () => {

        beforeEach(() => {
            httpClientSpy.delete;
            service = TestBed.inject(CategoryService);
        });

        it('should call http://localhost:4000/categories with category parameter', () => {

            service.deleteCategory('id');

            expect(httpClientSpy.delete).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.delete).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.delete).mock.calls[0].length).toBe(1);
            expect(vi.mocked(httpClientSpy.delete).mock.calls[0][0]).toBe('http://localhost:4000/categories/id');
        });
    });
});
