import type { Mock } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
        getArticles: Mock;
        deleteArticle: Mock;
    };
    let routerSpy: {
        navigate: Mock;
    };
    const route = {
        parent: {
            params: Observable.from([{ category: 'test' }])
        }
    };
    beforeEach(async () => {

        articleServiceSpy = {
            getArticles: vi.fn().mockName("ArticleService.getArticles"),
            deleteArticle: vi.fn().mockName("ArticleService.deleteArticle")
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
                { provide: ArticleService, useValue: articleServiceSpy },
                { provide: Router, useValue: routerSpy },
                {
                    provide: ActivatedRoute, useValue: route
                },
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

    it('should load articles on init', () => {
        component.ngOnInit();
        expect(articleServiceSpy.getArticles).toHaveBeenCalled();
    });

    describe('when adding a new article', () => {
        it('should navigate to ../add', () => {
            component.addArticle();
            expect(routerSpy.navigate).toHaveBeenCalled();
            expect(vi.mocked(routerSpy.navigate).mock.calls.length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0].length).toBe(2);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0].length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0][0]).toBe('../add');
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][1]).toEqual({ relativeTo: route });
        });
    });

    describe('when editiong an existing article with id 1', () => {
        it('should navigate to ../edit/1', () => {
            component.editArticle('1');
            expect(routerSpy.navigate).toHaveBeenCalled();
            expect(vi.mocked(routerSpy.navigate).mock.calls.length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0].length).toBe(2);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0].length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0][0]).toBe('../edit/1');
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][1]).toEqual({ relativeTo: route });
        });
    });

    describe('when deleting an existing article with id 1', () => {
        beforeEach(() => {
            articleServiceSpy.deleteArticle.mockReturnValue(Observable.of<object>({}));
            articleServiceSpy.getArticles.mockClear();
            component.deleteArticle('1');
        });

        it('should call delete function of articleservice with id 1', () => {
            expect(articleServiceSpy.deleteArticle).toHaveBeenCalled();
            expect(vi.mocked(articleServiceSpy.deleteArticle).mock.calls.length).toBe(1);
            expect(vi.mocked(articleServiceSpy.deleteArticle).mock.calls[0].length).toBe(1);
            expect(vi.mocked(articleServiceSpy.deleteArticle).mock.calls[0][0]).toBe('1');
        });

        it('should reload articles list after', () => {
            expect(articleServiceSpy.getArticles).toHaveBeenCalled();
            expect(vi.mocked(articleServiceSpy.getArticles).mock.calls.length).toBe(1);
        });
    });
});
