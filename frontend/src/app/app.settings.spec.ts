import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppSettingsHttpService, AppSettingsService, AppSettings } from './app.settings';
import { APP_BASE_HREF } from '@angular/common';
import * as Observable from 'rxjs';

describe('AppSettings', () => {
  const appSettings: AppSettings = new AppSettings();
  let appSettingsService: AppSettingsService = new AppSettingsService();
  let appSettingsHttpService: AppSettingsHttpService;
  let httpClientSpy: {
    get: jasmine.Spy,
  };
  beforeEach(waitForAsync(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    appSettings.categoriesApiUrl = 'http://localhost:4000/categories';

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        AppSettingsService,
        AppSettingsHttpService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: AppSettingsService, useValue: { settings: { categoriesApiUrl: 'http://localhost:4000/categories' } } },
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
    });
    appSettingsHttpService = TestBed.inject(AppSettingsHttpService);
    appSettingsService = TestBed.inject(AppSettingsService);
  }));

  it('should create the AppSettingsService', () => {
    expect(appSettingsService).toBeTruthy();
  });

  it('should create the AppSettingsHttpService', () => {
    expect(appSettingsHttpService).toBeTruthy();
  });

  describe('on app initialization', () => {
    beforeEach(waitForAsync(() => {
      httpClientSpy.get.and.returnValues(Observable.of<AppSettings>(appSettings));
      appSettingsHttpService.initializeApp();
    }));

    it('should get data from assets/settings.json', () => {
      expect(httpClientSpy.get).toHaveBeenCalled();
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args.length).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toBe('assets/settings.json');
    });

    it('should assign categories url to AppSettingsService', () => {
      expect(appSettingsService.settings).toBe(appSettings);
    });
  });
});
