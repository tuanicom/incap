import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
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
    getCategories: jasmine.Spy,
    deleteCategory: jasmine.Spy,
  };
  let routerSpy: {
    navigate: jasmine.Spy,
  };

  beforeEach(waitForAsync(() => {

    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['getCategories', 'deleteCategory']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
    declarations: [
    ],
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
});
  }));

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
      expect(routerSpy.navigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.first().args.length).toBe(2);
      expect(routerSpy.navigate.calls.first().args[0].length).toBe(1);
      expect(routerSpy.navigate.calls.first().args[0][0]).toBe('../add');
    });
  });

  describe('when editiong an existing category with id 1', () => {
    it('should navigate to /categories/edit/1', () => {
      component.editCategory('1');
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(routerSpy.navigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.first().args.length).toBe(2);
      expect(routerSpy.navigate.calls.first().args[0].length).toBe(1);
      expect(routerSpy.navigate.calls.first().args[0][0]).toBe('../edit/1');
    });
  });

  describe('when deleting an existing category with id 1', () => {
    beforeEach(() => {
      categoryServiceSpy.deleteCategory.and.returnValue(Observable.of<object>({}));
      categoryServiceSpy.getCategories.calls.reset();
      component.deleteCategory('1');
    });

    it('should call delete function of categoryservice with id 1', () => {
      expect(categoryServiceSpy.deleteCategory).toHaveBeenCalled();
      expect(categoryServiceSpy.deleteCategory.calls.count()).toBe(1);
      expect(categoryServiceSpy.deleteCategory.calls.first().args.length).toBe(1);
      expect(categoryServiceSpy.deleteCategory.calls.first().args[0]).toBe('1');
    });

    it('should reload categories list after', () => {
      expect(categoryServiceSpy.getCategories).toHaveBeenCalled();
      expect(categoryServiceSpy.getCategories.calls.count()).toBe(1);
    });
  });
});
