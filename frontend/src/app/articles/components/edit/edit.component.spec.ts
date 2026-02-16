import type { Mock } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import * as Observable from 'rxjs';

describe('Articles > EditComponent', () => {
    let component: EditComponent;
    let fixture: ComponentFixture<EditComponent>;
    let articleServiceSpy: {
        getArticleById: Mock;
        updateArticle: Mock;
    };
    let routerSpy: {
        navigate: Mock;
    };
    const articleId = '123';

    beforeEach(async () => {
        articleServiceSpy = {
            getArticleById: vi.fn().mockName("ArticleService.getArticleById"),
            updateArticle: vi.fn().mockName("ArticleService.updateArticle")
        };
        routerSpy = {
            navigate: vi.fn().mockName("Router.navigate")
        };

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [FontAwesomeModule,
                ReactiveFormsModule,
                BrowserModule,
                RouterModule.forRoot([], {}),
                EditComponent],
            providers: [
                { provide: ArticleService, useValue: articleServiceSpy },
                { provide: Router, useValue: routerSpy },
                { provide: ActivatedRoute, useValue: { params: Observable.of<Params>({ id: articleId }) } },
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
        articleServiceSpy.getArticleById.mockClear();
        articleServiceSpy.getArticleById.mockReturnValue(Observable.of<Article>({
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
        expect(vi.mocked(articleServiceSpy.getArticleById).mock.calls.length).toBe(1);
        expect(vi.mocked(articleServiceSpy.getArticleById).mock.calls[0][0]).toBe(articleId);
    });

    describe('when submitting the form', () => {

        beforeEach(() => {
            component.editArticleForm.get('content').setValue('test2');
            articleServiceSpy.updateArticle.mockReturnValue(Observable.of<Article>({} as Article));
            component.onSubmit();
        });

        it('should call the add function with article service with the values of the form', () => {
            expect(articleServiceSpy.updateArticle).toHaveBeenCalled();
            expect(vi.mocked(articleServiceSpy.updateArticle).mock.calls.length).toBe(1);
            expect(vi.mocked(articleServiceSpy.updateArticle).mock.calls[0].length).toBe(1);
            expect((vi.mocked(articleServiceSpy.updateArticle).mock.calls[0][0] as Article).id).toBe(articleId);
            expect((vi.mocked(articleServiceSpy.updateArticle).mock.calls[0][0] as Article).title).toBe('test');
            expect((vi.mocked(articleServiceSpy.updateArticle).mock.calls[0][0] as Article).content).toBe('test2');
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
