import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AppSettings {
  categoriesApiUrl: string;
  usersApiUrl: string;
  articlesApiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AppSettingsService {
  public settings: AppSettings = {
    categoriesApiUrl: '',
    usersApiUrl: '',
    articlesApiUrl: ''
  };
}


@Injectable({ providedIn: 'root' })
export class AppSettingsHttpService {
  private http = inject(HttpClient);
  private appSettingsService = inject(AppSettingsService);

  public initializeApp(): void {
    this.http.get<AppSettings>('assets/settings.json').subscribe((res) => this.appSettingsService.settings = res);
  }
}
