import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Observable, shareReplay } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from '../../../comments/comment-list/comment-list.component';

@Component({
    selector: 'app-articles-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, CommentListComponent]
})
export class EditComponent implements OnInit {
  public article$!: Observable<Article>;
  private readonly articleService = inject(ArticleService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  editArticleForm = new FormGroup({
    content: new FormControl('', { nonNullable: true }),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getArticleById(params['id']);
    });
  }

  private getArticleById(id: string): void {
    this.article$ = this.articleService.getArticleById(id).pipe(shareReplay(1));
    this.article$.subscribe((article: Article) => {
      this.editArticleForm.controls.content.setValue(article.content);
    });
  }

  onSubmit(): void {
    this.article$.subscribe((article: Article) => {
      article.content = this.editArticleForm.controls.content.value;
      this.articleService.updateArticle(article).subscribe(() => {
        this.goBackToList();
      });
    });
  }

  goBackToList(): void {
    this.router.navigate(['list'], { relativeTo: this.route.parent });
  }
}
