import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-categories-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class AddComponent {
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  addCategoryForm = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    description: new FormControl('', { nonNullable: true }),
  });

  onSubmit(): void {
    const category: Category = {
      title: this.addCategoryForm.controls.title.value,
      description: this.addCategoryForm.controls.description.value
    } as Category;
    this.categoryService.addCategory(category).subscribe(() => {
      this.goBackToList();
    });
  }

  goBackToList(): void {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
