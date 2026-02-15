import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../comment.service';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class CommentFormComponent {
  @Input() articleId: string;
  @Output() created = new EventEmitter<Comment>();
  public text = '';
  private commentService = inject(CommentService);

  submit(): void {
    if (!this.text || !this.text.trim()) { return; }
    this.commentService.create(this.articleId, { text: this.text }).subscribe((res) => {
      this.created.emit(res);
      this.text = '';
    });
  }
}
