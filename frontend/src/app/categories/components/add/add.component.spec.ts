import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import * as Observable from 'rxjs';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let categoryServiceSpy: {
    addCategory: jasmine.Spy,
  };

  let routerSpy: {
    navigate: jasmine.Spy,
  };

  beforeEach(async(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoryService', ['addCategory']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [
        AddComponent
      ],
      imports: [
        AngularFontAwesomeModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        NgbModule,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: CategoryService, useValue: categoryServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
    });
  }));

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
      categoryServiceSpy.addCategory.and.returnValue(Observable.of<object>({}));
      component.onSubmit();
    });

    it('should call the add function with category service', () => {
      expect(categoryServiceSpy.addCategory).toHaveBeenCalled();
      expect(categoryServiceSpy.addCategory.calls.count()).toBe(1);
    });

    it('should add a category with the values of the form', () => {
      expect(categoryServiceSpy.addCategory.calls.first().args.length).toBe(1);
      expect((categoryServiceSpy.addCategory.calls.first().args[0] as Category).title).toBe('test');
      expect((categoryServiceSpy.addCategory.calls.first().args[0] as Category).description).toBe('test');
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
