import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class AppSettings {
  categoriesApiUrl: string;
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

  constructor(private http: HttpClient, private appSettingsService: AppSettingsService) {
  }

  initializeApp(): Promise<any> {

    return new Promise(
      (resolve) => {
        this.http.get('assets/settings.json')
          .toPromise()
          .then(response => {
            this.appSettingsService.settings = <AppSettings>response;
            resolve();
          });
      }
    );
  }
}
