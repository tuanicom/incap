import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import * as Observable from 'rxjs';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let categoryServiceSpy: {
    getCategoryById: jasmine.Spy,
    updateCategory: jasmine.Spy,
  };
  let routerSpy: {
    navigate: jasmine.Spy,
  };
  const categoryId = '123';

  beforeEach(waitForAsync(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategoryById', 'updateCategory']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [
        EditComponent
      ],
      imports: [
        FontAwesomeModule
        ,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        NgbModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })
      ],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { params: Observable.of<Params>({ id: categoryId }) } }
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    categoryServiceSpy.getCategoryById.calls.reset();
    categoryServiceSpy.getCategoryById.and.returnValue(Observable.of<Category>({
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
    expect(categoryServiceSpy.getCategoryById.calls.count()).toBe(1);
    expect(categoryServiceSpy.getCategoryById.calls.first().args[0]).toBe(categoryId);
  });

  describe('when submitting the form', () => {

    beforeEach(() => {
      component.editCategoryForm.get('description').setValue('test2');
      categoryServiceSpy.updateCategory.and.returnValue(Observable.of<Category>({} as Category));
      component.onSubmit();
    });

    it('should call the add function with category service with the values of the form', () => {
      expect(categoryServiceSpy.updateCategory).toHaveBeenCalled();
      expect(categoryServiceSpy.updateCategory.calls.count()).toBe(1);
      expect(categoryServiceSpy.updateCategory.calls.first().args.length).toBe(1);
      expect((categoryServiceSpy.updateCategory.calls.first().args[0] as Category).id).toBe(categoryId);
      expect((categoryServiceSpy.updateCategory.calls.first().args[0] as Category).title).toBe('test');
      expect((categoryServiceSpy.updateCategory.calls.first().args[0] as Category).description).toBe('test2');
    });

    it('should redirect to the list after', () => {
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(routerSpy.navigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.first().args.length).toBe(1);
      expect(routerSpy.navigate.calls.first().args[0].length).toBe(1);
      expect(routerSpy.navigate.calls.first().args[0][0]).toBe('/categories');
    });
  });
});
