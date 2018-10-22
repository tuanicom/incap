import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'category-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  private category$: Observable<Category>;

  editCategoryForm = new FormGroup({
    description: new FormControl(''),
  });

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.category$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.categoryService.getCategoryById(params.get('id')))
    );
    this.category$.subscribe((category: Category) => {
      console.log("category loaded" + JSON.stringify(category));
      this.editCategoryForm.get("description").setValue(category.description);
    })
  }

  onSubmit() {
    this.category$.subscribe((category: Category) => {
      category.description = this.editCategoryForm.controls['description'].value;
      this.categoryService.updateCategory(category).subscribe(() => {
        this.goBackToList();
      });
    });
  }

  goBackToList() {
    this.router.navigate(['/categories']);
  }
}
