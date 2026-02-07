import type { Mock } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as Observable from 'rxjs';

describe('Categories > ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;
    let categoryServiceSpy: {
        getCategories: Mock;
        deleteCategory: Mock;
    };
    let routerSpy: {
        navigate: Mock;
    };

    beforeEach(async () => {

        categoryServiceSpy = {
            getCategories: vi.fn().mockName("CategoryService.getCategories"),
            deleteCategory: vi.fn().mockName("CategoryService.deleteCategory")
        };
        routerSpy = {
            navigate: vi.fn().mockName("Router.navigate")
        };

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [FontAwesomeModule,
                ReactiveFormsModule,
                BrowserModule,
                NgbModule,
                ListComponent],
            providers: [
                { provide: CategoryService, useValue: categoryServiceSpy },
                { provide: Router, useValue: routerSpy },
                { provide: ActivatedRoute, useValue: {} },
                provideHttpClient(withInterceptorsFromDi())
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load categories on init', () => {
        component.ngOnInit();
        expect(categoryServiceSpy.getCategories).toHaveBeenCalled();
    });

    describe('when adding a new category', () => {
        it('should navigate to /categories/add', () => {
            component.addCategory();
            expect(routerSpy.navigate).toHaveBeenCalled();
            expect(vi.mocked(routerSpy.navigate).mock.calls.length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0].length).toBe(2);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0].length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0][0]).toBe('../add');
        });
    });

    describe('when editiong an existing category with id 1', () => {
        it('should navigate to /categories/edit/1', () => {
            component.editCategory('1');
            expect(routerSpy.navigate).toHaveBeenCalled();
            expect(vi.mocked(routerSpy.navigate).mock.calls.length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0].length).toBe(2);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0].length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0][0]).toBe('../edit/1');
        });
    });

    describe('when deleting an existing category with id 1', () => {
        beforeEach(() => {
            categoryServiceSpy.deleteCategory.mockReturnValue(Observable.of<object>({}));
            categoryServiceSpy.getCategories.mockClear();
            component.deleteCategory('1');
        });

        it('should call delete function of categoryservice with id 1', () => {
            expect(categoryServiceSpy.deleteCategory).toHaveBeenCalled();
            expect(vi.mocked(categoryServiceSpy.deleteCategory).mock.calls.length).toBe(1);
            expect(vi.mocked(categoryServiceSpy.deleteCategory).mock.calls[0].length).toBe(1);
            expect(vi.mocked(categoryServiceSpy.deleteCategory).mock.calls[0][0]).toBe('1');
        });

        it('should reload categories list after', () => {
            expect(categoryServiceSpy.getCategories).toHaveBeenCalled();
            expect(vi.mocked(categoryServiceSpy.getCategories).mock.calls.length).toBe(1);
        });
    });
});
