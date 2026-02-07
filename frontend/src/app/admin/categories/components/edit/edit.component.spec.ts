import type { Mock } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import * as Observable from 'rxjs';

describe('Categories > EditComponent', () => {
    let component: EditComponent;
    let fixture: ComponentFixture<EditComponent>;
    let categoryServiceSpy: {
        getCategoryById: Mock;
        updateCategory: Mock;
    };
    let routerSpy: {
        navigate: Mock;
    };
    const categoryId = '123';

    beforeEach(async () => {
        categoryServiceSpy = {
            getCategoryById: vi.fn().mockName("CategoryService.getCategoryById"),
            updateCategory: vi.fn().mockName("CategoryService.updateCategory")
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
                RouterModule.forRoot([], {}),
                EditComponent],
            providers: [
                { provide: CategoryService, useValue: categoryServiceSpy },
                { provide: Router, useValue: routerSpy },
                { provide: ActivatedRoute, useValue: { params: Observable.of<Params>({ id: categoryId }) } },
                provideHttpClient(withInterceptorsFromDi())
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(() => {
        categoryServiceSpy.getCategoryById.mockClear();
        categoryServiceSpy.getCategoryById.mockReturnValue(Observable.of<Category>({
            id: categoryId,
            title: 'test',
            description: 'test'
        } as Category));
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should init the form', () => {
        expect(component.editCategoryForm).toBeTruthy();
    });

    it('should retrieve the category corresponding to the provided id', () => {
        expect(categoryServiceSpy.getCategoryById).toHaveBeenCalled();
        expect(vi.mocked(categoryServiceSpy.getCategoryById).mock.calls.length).toBe(1);
        expect(vi.mocked(categoryServiceSpy.getCategoryById).mock.calls[0][0]).toBe(categoryId);
    });

    describe('when submitting the form', () => {

        beforeEach(() => {
            component.editCategoryForm.get('description').setValue('test2');
            categoryServiceSpy.updateCategory.mockReturnValue(Observable.of<Category>({} as Category));
            component.onSubmit();
        });

        it('should call the add function with category service with the values of the form', () => {
            expect(categoryServiceSpy.updateCategory).toHaveBeenCalled();
            expect(vi.mocked(categoryServiceSpy.updateCategory).mock.calls.length).toBe(1);
            expect(vi.mocked(categoryServiceSpy.updateCategory).mock.calls[0].length).toBe(1);
            expect((vi.mocked(categoryServiceSpy.updateCategory).mock.calls[0][0] as Category).id).toBe(categoryId);
            expect((vi.mocked(categoryServiceSpy.updateCategory).mock.calls[0][0] as Category).title).toBe('test');
            expect((vi.mocked(categoryServiceSpy.updateCategory).mock.calls[0][0] as Category).description).toBe('test2');
        });

        it('should redirect to the list after', () => {
            expect(routerSpy.navigate).toHaveBeenCalled();
            expect(vi.mocked(routerSpy.navigate).mock.calls.length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0].length).toBe(2);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0].length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0][0]).toBe('list');
        });
    });
});
