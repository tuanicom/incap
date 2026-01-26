import { Component, OnInit, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from '../../models/article';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-articles-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    imports: [ReactiveFormsModule]
})
export class AddComponent implements OnInit {
  private articleService = inject(ArticleService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private category: string;

  ngOnInit(): void {
    this.route.parent.params.subscribe((params: Params) => {
      this.category = params.category;
    });
  }

  addArticleForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  onSubmit(): void {
    const article: Article = {
      title: this.addArticleForm.get('title').value,
      content: this.addArticleForm.get('content').value,
      category: this.category,
      author: ""
    } as Article;
    this.articleService.addArticle(article).subscribe(() => {
      this.goBackToList();
    });
  }

  goBackToList(): void {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
