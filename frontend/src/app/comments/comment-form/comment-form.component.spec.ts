import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentFormComponent } from './comment-form.component';
import type { Mock } from 'vitest';
import { CommentService } from '../comment.service';
import * as Observable from 'rxjs';

describe('Comments > CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  let commentServiceSpy: { create: Mock };

  beforeEach(async () => {
    commentServiceSpy = { create: vi.fn().mockName('CommentService.create') };

    await TestBed.configureTestingModule({
      imports: [CommentFormComponent],
      providers: [
        { provide: CommentService, useValue: commentServiceSpy },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    component.articleId = 'article1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call create on submit', () => {
    commentServiceSpy.create.mockReturnValueOnce(Observable.of({ _id: '1', text: 'ok' }));
    component.text = 'ok';
    component.submit();
    expect(commentServiceSpy.create).toHaveBeenCalled();
  });
});
