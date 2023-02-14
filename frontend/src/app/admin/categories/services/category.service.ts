import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { AppSettingsService } from 'src/app/app.settings';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private get apiUrl(): string {
    return this.appSettings.settings.categoriesApiUrl;
  }

  constructor(private http: HttpClient, private appSettings: AppSettingsService) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  public getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.apiUrl, category);
  }

  public deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
