import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../services/category.service"
import { Category } from "../../models/category"
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'list-categories',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public categories$: Observable<Category[]>;

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categories$ = this.categoryService.getCategories();
    this.categories$.subscribe((categories: Category[]) => {
      console.log("categories loaded" + JSON.stringify(categories));
    })
  }

  addCategory() {
    this.router.navigate([`/categories/add`]);
  }

  editCategory(id: string) {
    this.router.navigate([`/categories/edit/${id}`]);
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.getCategories();
    });
  }
}
