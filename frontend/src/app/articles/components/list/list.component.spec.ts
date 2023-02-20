import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as Observable from 'rxjs';

describe('Articles > ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let articleServiceSpy: {
    getArticles: jasmine.Spy,
    deleteArticle: jasmine.Spy,
  };
  let routerSpy: {
    navigate: jasmine.Spy,
  };
  const route = {
    parent: {
      params: Observable.from([{ category: 'test' }])
    }
  };
  beforeEach(waitForAsync(() => {

    articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticles', 'deleteArticle']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [
        ListComponent
      ],
      imports: [
        FontAwesomeModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        NgbModule,
      ],
      providers: [
        { provide: ArticleService, useValue: articleServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute, useValue: route
        }
      ],
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

  it('should load articles on init', () => {
    component.ngOnInit();
    expect(articleServiceSpy.getArticles).toHaveBeenCalled();
  });

  describe('when adding a new article', () => {
    it('should navigate to ../add', () => {
      component.addArticle();
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(routerSpy.navigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.first().args.length).toBe(2);
      expect(routerSpy.navigate.calls.first().args[0].length).toBe(1);
      expect(routerSpy.navigate.calls.first().args[0][0]).toBe('../add');
      expect(routerSpy.navigate.calls.first().args[1]).toEqual({relativeTo: route});
    });
  });

  describe('when editiong an existing article with id 1', () => {
    it('should navigate to ../edit/1', () => {
      component.editArticle('1');
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(routerSpy.navigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.first().args.length).toBe(2);
      expect(routerSpy.navigate.calls.first().args[0].length).toBe(1);
      expect(routerSpy.navigate.calls.first().args[0][0]).toBe('../edit/1');
      expect(routerSpy.navigate.calls.first().args[1]).toEqual({relativeTo: route});
    });
  });

  describe('when deleting an existing article with id 1', () => {
    beforeEach(() => {
      articleServiceSpy.deleteArticle.and.returnValue(Observable.of<object>({}));
      articleServiceSpy.getArticles.calls.reset();
      component.deleteArticle('1');
    });

    it('should call delete function of articleservice with id 1', () => {
      expect(articleServiceSpy.deleteArticle).toHaveBeenCalled();
      expect(articleServiceSpy.deleteArticle.calls.count()).toBe(1);
      expect(articleServiceSpy.deleteArticle.calls.first().args.length).toBe(1);
      expect(articleServiceSpy.deleteArticle.calls.first().args[0]).toBe('1');
    });

    it('should reload articles list after', () => {
      expect(articleServiceSpy.getArticles).toHaveBeenCalled();
      expect(articleServiceSpy.getArticles.calls.count()).toBe(1);
    });
  });
});
