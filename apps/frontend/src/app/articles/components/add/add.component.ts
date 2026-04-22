import { Component, OnInit, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from '../../models/article';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-articles-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class AddComponent implements OnInit {
  private readonly articleService = inject(ArticleService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private category = '';

  ngOnInit(): void {
    const parentRoute = this.route.parent;
    if (!parentRoute) {
      return;
    }

    parentRoute.params.subscribe((params: Params) => {
      this.category = params['category'];
    });
  }

  addArticleForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    content: new FormControl('', { nonNullable: true }),
  });

  onSubmit(): void {
    const article: Article = {
      title: this.addArticleForm.controls.title.value,
      content: this.addArticleForm.controls.content.value,
      category: this.category,
      author: ""
    };
    this.articleService.addArticle(article).subscribe(() => {
      this.goBackToList();
    });
  }

  goBackToList(): void {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
