import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from '../../models/article';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-articles-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    standalone: false
})
export class AddComponent implements OnInit {

  private category: string;
  constructor(private articleService: ArticleService, private router: Router, private route: ActivatedRoute) { }

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
