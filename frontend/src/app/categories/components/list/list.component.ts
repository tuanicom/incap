import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { faPlus, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'categories-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public categories$: Observable<Category[]>;
  public icons: { [id: string]: IconDefinition; } = {
    'plus': faPlus,
    'edit': faEdit,
    'trash': faTrash,
  };

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categories$ = this.categoryService.getCategories();
  }

  addCategory() {
    this.router.navigate(['/categories/add']);
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
