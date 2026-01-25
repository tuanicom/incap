import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-categories-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    imports: [ReactiveFormsModule, CommonModule]
})
export class EditComponent implements OnInit {
  public category$: Observable<Category>;
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editCategoryForm = new FormGroup({
    description: new FormControl(''),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getCategoryById(params.id);
    });
  }

  private getCategoryById(id: string): void {
    this.category$ = this.categoryService.getCategoryById(id);
    if (this.category$) {
      this.category$.subscribe((category: Category) => {
        this.editCategoryForm.get('description').setValue(category.description);
      });
    }
  }

  onSubmit(): void {
    this.category$.subscribe((category: Category) => {
      category.description = this.editCategoryForm.controls.description.value;
      this.categoryService.updateCategory(category).subscribe(() => {
        this.goBackToList();
      });
    });
  }

  goBackToList(): void {
    this.router.navigate(['list'], { relativeTo: this.route.parent });
  }
}
