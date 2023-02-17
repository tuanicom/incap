import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import * as Observable from 'rxjs';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let articleServiceSpy: {
    getArticleById: jasmine.Spy,
    updateArticle: jasmine.Spy,
  };
  let routerSpy: {
    navigate: jasmine.Spy,
  };
  const articleId = '123';

  beforeEach(waitForAsync(() => {
    articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticleById', 'updateArticle']);
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
        RouterModule.forRoot([], {})
      ],
      providers: [
        { provide: ArticleService, useValue: articleServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { params: Observable.of<Params>({ id: articleId }) } }
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    articleServiceSpy.getArticleById.calls.reset();
    articleServiceSpy.getArticleById.and.returnValue(Observable.of<Article>({
      id: articleId,
      title: 'test',
      content: 'test'
    } as Article));
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init the form', () => {
    expect(component.editArticleForm).toBeTruthy();
  });

  it('should retrieve the article corresponding to the provided id', () => {
    expect(articleServiceSpy.getArticleById).toHaveBeenCalled();
    expect(articleServiceSpy.getArticleById.calls.count()).toBe(1);
    expect(articleServiceSpy.getArticleById.calls.first().args[0]).toBe(articleId);
  });

  describe('when submitting the form', () => {

    beforeEach(() => {
      component.editArticleForm.get('content').setValue('test2');
      articleServiceSpy.updateArticle.and.returnValue(Observable.of<Article>({} as Article));
      component.onSubmit();
    });

    it('should call the add function with article service with the values of the form', () => {
      expect(articleServiceSpy.updateArticle).toHaveBeenCalled();
      expect(articleServiceSpy.updateArticle.calls.count()).toBe(1);
      expect(articleServiceSpy.updateArticle.calls.first().args.length).toBe(1);
      expect((articleServiceSpy.updateArticle.calls.first().args[0] as Article).id).toBe(articleId);
      expect((articleServiceSpy.updateArticle.calls.first().args[0] as Article).title).toBe('test');
      expect((articleServiceSpy.updateArticle.calls.first().args[0] as Article).content).toBe('test2');
    });

    it('should redirect to the list after', () => {
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(routerSpy.navigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.first().args.length).toBe(1);
      expect(routerSpy.navigate.calls.first().args[0].length).toBe(1);
      expect(routerSpy.navigate.calls.first().args[0][0]).toBe('/articles');
    });
  });
});
