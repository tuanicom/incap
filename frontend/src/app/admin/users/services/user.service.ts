import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AppSettingsService } from 'src/app/app.settings';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private get apiUrl(): string {
    return this.appSettings.settings.usersApiUrl;
  }

  constructor(private http: HttpClient, private appSettings: AppSettingsService) { }

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
