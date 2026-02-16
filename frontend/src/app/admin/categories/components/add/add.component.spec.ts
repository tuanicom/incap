import type { Mock } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import * as Observable from 'rxjs';

describe('Categories > AddComponent', () => {
    let component: AddComponent;
    let fixture: ComponentFixture<AddComponent>;
    let categoryServiceSpy: {
        addCategory: Mock;
    };

    let routerSpy: {
        navigate: Mock;
    };

    beforeEach(async () => {
        categoryServiceSpy = {
            addCategory: vi.fn().mockName("CategoryService.addCategory")
        };
        routerSpy = {
            navigate: vi.fn().mockName("Router.navigate")
        };

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [FontAwesomeModule,
                ReactiveFormsModule,
                BrowserModule,
                AddComponent],
            providers: [
                { provide: CategoryService, useValue: categoryServiceSpy },
                { provide: Router, useValue: routerSpy },
                { provide: ActivatedRoute, useValue: {} },
                provideHttpClient(withInterceptorsFromDi())
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should init the form', () => {
        expect(component.addCategoryForm).toBeTruthy();
    });

    describe('when submitting the form', () => {

        beforeEach(() => {
            component.addCategoryForm.get('title').setValue('test');
            component.addCategoryForm.get('description').setValue('test');
            categoryServiceSpy.addCategory.mockReturnValue(Observable.of<object>({}));
            component.onSubmit();
        });

        it('should call the add function with category service', () => {
            expect(categoryServiceSpy.addCategory).toHaveBeenCalled();
            expect(vi.mocked(categoryServiceSpy.addCategory).mock.calls.length).toBe(1);
        });

        it('should add a category with the values of the form', () => {
            expect(vi.mocked(categoryServiceSpy.addCategory).mock.calls[0].length).toBe(1);
            expect((vi.mocked(categoryServiceSpy.addCategory).mock.calls[0][0] as Category).title).toBe('test');
            expect((vi.mocked(categoryServiceSpy.addCategory).mock.calls[0][0] as Category).description).toBe('test');
        });

        it('should redirect to the list after', () => {
            expect(routerSpy.navigate).toHaveBeenCalled();
            expect(vi.mocked(routerSpy.navigate).mock.calls.length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0].length).toBe(2);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0].length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0][0]).toBe('../list');
        });
    });
});
