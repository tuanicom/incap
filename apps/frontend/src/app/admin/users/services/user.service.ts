import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AppSettingsService } from '../../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly appSettings = inject(AppSettingsService);

  private get apiUrl(): string {
    return this.appSettings.settings.usersApiUrl;
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  public getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, user);
  }

  public deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
