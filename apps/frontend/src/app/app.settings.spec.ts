import type { Mock } from "vitest";
import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppSettingsHttpService, AppSettingsService, AppSettings } from './app.settings';
import { APP_BASE_HREF } from '@angular/common';
import * as Observable from 'rxjs';

describe('AppSettings', () => {
    const appSettings: AppSettings = new AppSettings();
    let appSettingsService: AppSettingsService = new AppSettingsService();
    let appSettingsHttpService: AppSettingsHttpService;
    let httpClientSpy: {
        get: Mock;
    };
    beforeEach(async () => {
        httpClientSpy = {
            get: vi.fn().mockName("HttpClient.get")
        };
        appSettings.categoriesApiUrl = 'http://localhost:4000/categories';
        appSettings.usersApiUrl = 'http://localhost:4000/users';

        await TestBed.configureTestingModule({
            imports: [],
            providers: [
                AppSettingsService,
                AppSettingsHttpService,
                { provide: HttpClient, useValue: httpClientSpy },
                { provide: AppSettingsService, useValue: { settings: appSettings } },
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();
        appSettingsHttpService = TestBed.inject(AppSettingsHttpService);
        appSettingsService = TestBed.inject(AppSettingsService);
    });

    it('should create the AppSettingsService', () => {
        expect(appSettingsService).toBeTruthy();
    });

    it('should create the AppSettingsHttpService', () => {
        expect(appSettingsHttpService).toBeTruthy();
    });

    describe('on app initialization', () => {
        beforeEach(async () => {
            httpClientSpy.get.mockReturnValueOnce(Observable.of<AppSettings>(appSettings));
            appSettingsHttpService.initializeApp();
            await new Promise((resolve) => setTimeout(resolve, 0));
        });

        it('should get data from assets/settings.json', () => {
            expect(httpClientSpy.get).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.get).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0].length).toBe(1);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0][0]).toBe('assets/settings.json');
        });

        it('should assign categories url to AppSettingsService', () => {
            expect(appSettingsService.settings).toBe(appSettings);
        });
    });
});
