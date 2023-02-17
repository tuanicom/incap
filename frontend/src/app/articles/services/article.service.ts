import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article } from '../models/article';
import { Observable } from 'rxjs';
import { AppSettingsService } from 'src/app/app.settings';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private get apiUrl(): string {
    return this.appSettings.settings.articlesApiUrl;
  }

  constructor(private http: HttpClient, private appSettings: AppSettingsService) { }

  public getArticles(category: string): Observable<Article[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('category', category);
    return this.http.get<Article[]>(this.apiUrl, { params: queryParams });
  }

  public getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  public addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  public updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(this.apiUrl, article);
  }

  public deleteArticle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
