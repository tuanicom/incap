import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service"
import {Category} from "../../models/category"
import { Observable } from 'rxjs';

@Component({
  selector: 'list-categories',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public categories$: Observable<Category[]>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();  
    this.categories$.subscribe((categories: Category[])=>{
      console.log("data loaded"+categories);
    })
  }

}
