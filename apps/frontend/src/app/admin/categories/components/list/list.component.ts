import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeIcons } from 'primeng/api';

@Component({
    selector: 'app-categories-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class ListComponent implements OnInit {
  public categories$!: Observable<Category[]>;
  private readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public icons = {
    plus: PrimeIcons.PLUS,
    edit: PrimeIcons.PENCIL,
    trash: PrimeIcons.TRASH,
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
