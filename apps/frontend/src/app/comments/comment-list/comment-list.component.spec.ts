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

  it('should not load comments when article id is missing', () => {
    commentServiceSpy.listForArticle.mockClear();
    const localFixture = TestBed.createComponent(CommentListComponent);
    const localComponent = localFixture.componentInstance;

    localFixture.detectChanges();

    expect(commentServiceSpy.listForArticle).not.toHaveBeenCalled();
    expect(localComponent.comments).toEqual([]);
  });

  it('should ignore load when article id is null', () => {
    commentServiceSpy.listForArticle.mockClear();
    component.articleId = null;

    component.load();

    expect(commentServiceSpy.listForArticle).not.toHaveBeenCalled();
  });

  it('should fallback to an empty comment list when the service returns nothing', () => {
    commentServiceSpy.listForArticle.mockReturnValueOnce(Observable.of(undefined));

    component.load();

    expect(component.comments).toEqual([]);
  });

  it('should prepend created comments', () => {
    component.comments = [{ _id: '1', text: 'Older', authorId: 'u1', articleId: 'a1', createdAt: '2024-01-01' }];

    component.onCreated({ _id: '2', text: 'Newer', authorId: 'u2', articleId: 'a1', createdAt: '2024-01-02' });

    expect(component.comments.map((comment) => comment._id)).toEqual(['2', '1']);
  });

  it('should update an existing comment in place', () => {
    component.comments = [
      { _id: '1', text: 'Old', authorId: 'u1', articleId: 'a1', createdAt: '2024-01-01' },
      { _id: '2', text: 'Keep', authorId: 'u2', articleId: 'a1', createdAt: '2024-01-02' }
    ];

    component.onUpdated({ _id: '1', text: 'Updated', authorId: 'u1', articleId: 'a1', createdAt: '2024-01-01' });

    expect(component.comments[0].text).toBe('Updated');
    expect(component.comments[1].text).toBe('Keep');
  });

  it('should leave the list unchanged when updating an unknown comment', () => {
    component.comments = [{ _id: '1', text: 'Existing', authorId: 'u1', articleId: 'a1', createdAt: '2024-01-01' }];

    component.onUpdated({ _id: 'missing', text: 'Updated', authorId: 'u2', articleId: 'a1', createdAt: '2024-01-02' });

    expect(component.comments).toEqual([
      { _id: '1', text: 'Existing', authorId: 'u1', articleId: 'a1', createdAt: '2024-01-01' }
    ]);
  });

  it('should remove deleted comments', () => {
    component.comments = [
      { _id: '1', text: 'First', authorId: 'u1', articleId: 'a1', createdAt: '2024-01-01' },
      { _id: '2', text: 'Second', authorId: 'u2', articleId: 'a1', createdAt: '2024-01-02' }
    ];

    component.onDeleted('1');

    expect(component.comments).toEqual([
      { _id: '2', text: 'Second', authorId: 'u2', articleId: 'a1', createdAt: '2024-01-02' }
    ]);
  });

  it('should render the empty state message', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('No comments yet.');
  });
});
