import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { faPlus, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-articles-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public articles$: Observable<Article[]>;
  public icons: { [id: string]: IconDefinition; } = {
    plus: faPlus,
    edit: faEdit,
    trash: faTrash,
  };
  private category: string;
  constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.params.subscribe((params: Params) => {console.log(params);
      this.category = params.category;
      this.getArticles();
    });
  }

  getArticles(): void {
    this.articles$ = this.articleService.getArticles(this.category);
  }

  addArticle(): void {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  editArticle(id: string): void {
    this.router.navigate([`../edit/${id}`], { relativeTo: this.route });
  }

  deleteArticle(id: string): void {
    this.articleService.deleteArticle(id).subscribe(() => {
      this.getArticles();
    });
  }
}
