import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-categories-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: true,
    imports: [CommonModule, FontAwesomeModule]
})
export class ListComponent implements OnInit {
  public categories$!: Observable<Category[]>;
  private readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public icons: { [id: string]: IconDefinition; } = {
    plus: faPlus,
    edit: faEdit,
    trash: faTrash,
  };

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categories$ = this.categoryService.getCategories();
  }

  addCategory(): void {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  editCategory(id?: string): void {
    if (!id) {
      return;
    }
    this.router.navigate([`../edit/${id}`], { relativeTo: this.route });
  }

  deleteCategory(id?: string): void {
    if (!id) {
      return;
    }
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.getCategories();
    });
  }
}
