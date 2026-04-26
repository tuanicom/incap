import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from '../app.settings';
import { Observable } from 'rxjs';
import { Comment } from './comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private readonly http = inject(HttpClient);
  private readonly appSettings = inject(AppSettingsService);

  private get articlesApi(): string {
    return this.appSettings.settings.articlesApiUrl;
  }

  private get commentsApi(): string {
    return this.appSettings.settings.commentsApiUrl;
  }

  public listForArticle(articleId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.articlesApi}/${articleId}/comments`);
  }

  public create(articleId: string, payload: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(`${this.articlesApi}/${articleId}/comments`, payload);
  }

  public update(id: string, payload: Partial<Comment>): Observable<Comment> {
    return this.http.put<Comment>(`${this.commentsApi}/${id}`, payload);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${this.commentsApi}/${id}`);
  }
}
