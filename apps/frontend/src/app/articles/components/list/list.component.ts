import { Component, OnInit, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeIcons } from 'primeng/api';

@Component({
    selector: 'app-articles-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class ListComponent implements OnInit {
  public articles$!: Observable<Article[]>;
  private readonly articleService = inject(ArticleService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public icons = {
    plus: PrimeIcons.PLUS,
    edit: PrimeIcons.PENCIL,
    trash: PrimeIcons.TRASH,
  };
  private category = '';

  ngOnInit(): void {
    const parentRoute = this.route.parent;
    if (!parentRoute) {
      return;
    }

    parentRoute.params.subscribe((params: Params) => {
      this.category = params['category'];
      this.getArticles();
    });
  }

  getArticles(): void {
    this.articles$ = this.articleService.getArticles(this.category);
  }

  addArticle(): void {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  editArticle(id?: string): void {
    if (!id) {
      return;
    }
    this.router.navigate([`../edit/${id}`], { relativeTo: this.route });
  }

  deleteArticle(id?: string): void {
    if (!id) {
      return;
    }
    this.articleService.deleteArticle(id).subscribe(() => {
      this.getArticles();
    });
  }
}
