import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class AppSettings {
  categoriesApiUrl: string;
  usersApiUrl: string;
  articlesApiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class AppSettingsService {
  public settings: AppSettings;

  constructor() {
    this.settings = new AppSettings();
  }
}


@Injectable({ providedIn: 'root' })
export class AppSettingsHttpService {
  private http = inject(HttpClient);
  private appSettingsService = inject(AppSettingsService);

  public initializeApp(): void {
    this.http.get('assets/settings.json').subscribe((res: AppSettings) => this.appSettingsService.settings = res);
  }
}
