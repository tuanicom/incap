import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentItemComponent } from './comment-item.component';
import type { Mock } from 'vitest';
import * as Observable from 'rxjs';
import { CommentService } from '../comment.service';

describe('Comments > CommentItemComponent', () => {
  let component: CommentItemComponent;
  let fixture: ComponentFixture<CommentItemComponent>;
  let commentServiceSpy: { update: Mock; delete: Mock };

  beforeEach(async () => {
    commentServiceSpy = {
      update: vi.fn().mockName('CommentService.update'),
      delete: vi.fn().mockName('CommentService.delete')
    };

    await TestBed.configureTestingModule({
      imports: [CommentItemComponent],
      providers: [
        { provide: CommentService, useValue: commentServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentItemComponent);
    component = fixture.componentInstance;
    component.comment = { _id: '1', text: 'hello', authorId: 'u1', articleId: 'a1', createdAt: new Date().toISOString() };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enter edit mode and cancel', () => {
    component.startEdit();
    expect(component.editing).toBe(true);
    component.cancel();
    expect(component.editing).toBe(false);
  });

  it('should call update on save', () => {
    commentServiceSpy.update.mockReturnValueOnce(Observable.of({ _id: '1', text: 'new' }));
    component.startEdit();
    component.editText = 'new';
    component.save();
    expect(commentServiceSpy.update).toHaveBeenCalled();
  });

  it('should call delete on remove', () => {
    commentServiceSpy.delete.mockReturnValueOnce(Observable.of({}));
    component.remove();
    expect(commentServiceSpy.delete).toHaveBeenCalled();
  });
});
