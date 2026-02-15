import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../comment.service';
import { Comment } from '../comment.model';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentItemComponent } from '../comment-item/comment-item.component';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  standalone: true,
  imports: [CommonModule, CommentFormComponent, CommentItemComponent]
})
export class CommentListComponent implements OnInit {
  @Input() articleId: string;
  public comments: Comment[] = [];
  private commentService = inject(CommentService);

  ngOnInit(): void {
    if (this.articleId) {
      this.load();
    }
  }

  load(): void {
    this.commentService.listForArticle(this.articleId).subscribe((cs) => this.comments = cs || []);
  }

  onCreated(comment: Comment): void {
    this.comments.unshift(comment);
  }

  onUpdated(updated: Comment): void {
    const idx = this.comments.findIndex(c => c._id === updated._id);
    if (idx >= 0) { this.comments[idx] = updated; }
  }

  onDeleted(id: string): void {
    this.comments = this.comments.filter(c => c._id !== id);
  }
}
