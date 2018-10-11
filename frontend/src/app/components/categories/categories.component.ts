import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service"
import {Category} from "../../models/category"
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories$: Observable<Category[]>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();  
    this.categories$.subscribe((categories: Category[])=>{
      console.log("data loaded"+categories);
    })
  }

}
