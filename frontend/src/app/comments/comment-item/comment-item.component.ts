import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Comment } from '../comment.model';
import { CommentService } from '../comment.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CommentItemComponent {
  @Input() comment: Comment;
  @Output() updated = new EventEmitter<Comment>();
  @Output() deleted = new EventEmitter<string>();
  public editing = false;
  public editText = '';
  private commentService = inject(CommentService);

  startEdit(): void {
    this.editing = true;
    this.editText = this.comment.text;
  }

  cancel(): void {
    this.editing = false;
  }

  save(): void {
    if (!this.editText || !this.editText.trim()) { return; }
    this.commentService.update(this.comment._id, { text: this.editText }).subscribe((res) => {
      this.updated.emit(res);
      this.comment = res;
      this.editing = false;
    });
  }

  remove(): void {
    this.commentService.delete(this.comment._id).subscribe(() => {
      this.deleted.emit(this.comment._id as string);
    });
  }
}
