import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import * as Observable from 'rxjs';

describe('Articles > AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let articleServiceSpy: {
    addArticle: jasmine.Spy,
  };

  let routerSpy: {
    navigate: jasmine.Spy,
  };

  beforeEach(waitForAsync(() => {
    articleServiceSpy = jasmine.createSpyObj('ArticleService', ['addArticle']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
    declarations: [
        AddComponent
    ],
    imports: [FontAwesomeModule,
        ReactiveFormsModule,
        BrowserModule,
        NgbModule],
    providers: [
        { provide: ArticleService, useValue: articleServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
            provide: ActivatedRoute, useValue: {
                parent: {
                    params: Observable.from([{ category: 'test' }])
                }
            }
        },
        provideHttpClient(withInterceptorsFromDi())
    ]
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
    expect(component.addArticleForm).toBeTruthy();
  });

  describe('when submitting the form', () => {

    beforeEach(() => {
      component.addArticleForm.get('title').setValue('test');
      component.addArticleForm.get('content').setValue('test');
      articleServiceSpy.addArticle.and.returnValue(Observable.of<object>({}));
      component.onSubmit();
    });

    it('should call the add function with article service', () => {
      expect(articleServiceSpy.addArticle).toHaveBeenCalled();
      expect(articleServiceSpy.addArticle.calls.count()).toBe(1);
    });

    it('should add a article with the values of the form', () => {
      expect(articleServiceSpy.addArticle.calls.first().args.length).toBe(1);
      expect((articleServiceSpy.addArticle.calls.first().args[0] as Article).title).toBe('test');
      expect((articleServiceSpy.addArticle.calls.first().args[0] as Article).content).toBe('test');
    });

    it('should redirect to the list after', () => {
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(routerSpy.navigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.first().args.length).toBe(2);
      expect(routerSpy.navigate.calls.first().args[0].length).toBe(1);
      expect(routerSpy.navigate.calls.first().args[0][0]).toBe('../list');
    });
  });
});
