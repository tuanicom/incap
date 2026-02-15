import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettingsService } from 'src/app/app.settings';
import { Observable } from 'rxjs';
import { Comment } from './comment.model';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private http = inject(HttpClient);
  private appSettings = inject(AppSettingsService);

  private get articlesApi(): string {
    return this.appSettings.settings.articlesApiUrl;
  }

  public listForArticle(articleId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.articlesApi}/${articleId}/comments`);
  }

  public create(articleId: string, payload: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(`${this.articlesApi}/${articleId}/comments`, payload);
  }

  public update(id: string, payload: Partial<Comment>): Observable<Comment> {
    return this.http.put<Comment>(`/comments/${id}`, payload);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`/comments/${id}`);
  }
}
