import { BrowserModule } from '@angular/platform-browser';
import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppSettingsHttpService } from './app.settings';

export function appInit(appSettingsHttpService: AppSettingsHttpService): () => void {
  return () => appSettingsHttpService.initializeApp();
}

@NgModule({ declarations: [
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        RouterModule,
        AppComponent], providers: [
        provideAppInitializer(() => {
        const initializerFn = (appInit)(inject(AppSettingsHttpService));
        return initializerFn();
      }),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {
}
