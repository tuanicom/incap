import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
    imports: [RouterModule]
})
export class ArticlesComponent implements OnInit{
  private route = inject(ActivatedRoute);
  public category: string;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.category = params.category;
    });
  }
}
