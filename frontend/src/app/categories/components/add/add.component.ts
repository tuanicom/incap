import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { Category } from '../../models/category';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-categories-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  constructor(private categoryService: CategoryService, private router: Router) { }

  addCategoryForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });


  ngOnInit(): void {
  }

  onSubmit(): void {
    const category: Category = {
      title: this.addCategoryForm.get('title').value,
      description: this.addCategoryForm.get('description').value
    } as Category;
    this.categoryService.addCategory(category).subscribe(() => {
      this.goBackToList();
    });
  }

  goBackToList(): void {
    this.router.navigate(['/categories']);
  }
}
