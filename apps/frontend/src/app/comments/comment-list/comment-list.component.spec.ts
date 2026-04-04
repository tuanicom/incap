import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentListComponent } from './comment-list.component';
import { CommentService } from '../comment.service';
import type { Mock } from 'vitest';
import * as Observable from 'rxjs';

describe('Comments > CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;
  let commentServiceSpy: { listForArticle: Mock };

  beforeEach(async () => {
    commentServiceSpy = { listForArticle: vi.fn().mockName('CommentService.listForArticle') };

    await TestBed.configureTestingModule({
      imports: [CommentListComponent],
      providers: [
        { provide: CommentService, useValue: commentServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    component.articleId = 'a1';
    commentServiceSpy.listForArticle.mockReturnValueOnce(Observable.of([]));
    fixture.detectChanges();
  });

  it('should create and load comments', () => {
    expect(component).toBeTruthy();
    expect(commentServiceSpy.listForArticle).toHaveBeenCalled();
  });
});
