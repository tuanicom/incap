import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.uri}/categories`);
  }

  public getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.uri}/categories/${id}`);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.uri}/categories`, category);
  }

  public updateCategory(category): Observable<Category> {
    return this.http.put<Category>(`${this.uri}/categories`, category);
  }

  public deleteCategory(id: string) {
    return this.http.delete(`${this.uri}/categories/${id}`);
  }
}
