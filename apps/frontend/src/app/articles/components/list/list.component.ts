import { Component, OnInit, inject } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faPlus, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-articles-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: true,
    imports: [CommonModule, FontAwesomeModule]
})
export class ListComponent implements OnInit {
  public articles$!: Observable<Article[]>;
  private readonly articleService = inject(ArticleService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public icons: { [id: string]: IconDefinition; } = {
    plus: faPlus,
    edit: faEdit,
    trash: faTrash,
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
