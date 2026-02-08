import type { Mock } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
        addArticle: Mock;
    };

    let routerSpy: {
        navigate: Mock;
    };

    beforeEach(async () => {
        articleServiceSpy = {
            addArticle: vi.fn().mockName("ArticleService.addArticle")
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
                AddComponent],
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
        expect(component.addArticleForm).toBeTruthy();
    });

    describe('when submitting the form', () => {

        beforeEach(() => {
            component.addArticleForm.get('title').setValue('test');
            component.addArticleForm.get('content').setValue('test');
            articleServiceSpy.addArticle.mockReturnValue(Observable.of<object>({}));
            component.onSubmit();
        });

        it('should call the add function with article service', () => {
            expect(articleServiceSpy.addArticle).toHaveBeenCalled();
            expect(vi.mocked(articleServiceSpy.addArticle).mock.calls.length).toBe(1);
        });

        it('should add a article with the values of the form', () => {
            expect(vi.mocked(articleServiceSpy.addArticle).mock.calls[0].length).toBe(1);
            expect((vi.mocked(articleServiceSpy.addArticle).mock.calls[0][0] as Article).title).toBe('test');
            expect((vi.mocked(articleServiceSpy.addArticle).mock.calls[0][0] as Article).content).toBe('test');
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
