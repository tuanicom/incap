import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AppSettings {
  categoriesApiUrl: string;
  usersApiUrl: string;
  articlesApiUrl: string;
  commentsApiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AppSettingsService {
  public settings: AppSettings = {
    categoriesApiUrl: '',
    usersApiUrl: '',
    articlesApiUrl: '',
    commentsApiUrl: ''
  };
}


@Injectable({ providedIn: 'root' })
export class AppSettingsHttpService {
  private readonly http = inject(HttpClient);
  private readonly appSettingsService = inject(AppSettingsService);

  public initializeApp(): void {
    this.http.get<AppSettings>('assets/settings.json').subscribe((res) => this.appSettingsService.settings = res);
  }
}
