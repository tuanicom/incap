import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-articles-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    imports: [ReactiveFormsModule, CommonModule]
})
export class EditComponent implements OnInit {
  public article$: Observable<Article>;
  private articleService = inject(ArticleService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editArticleForm = new FormGroup({
    content: new FormControl(''),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getArticleById(params.id);
    });
  }

  private getArticleById(id: string): void {
    this.article$ = this.articleService.getArticleById(id);
    if (this.article$) {
      this.article$.subscribe((article: Article) => {
        this.editArticleForm.get('content').setValue(article.content);
      });
    }
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
