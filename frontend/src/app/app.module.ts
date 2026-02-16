import { BrowserModule } from '@angular/platform-browser';
import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppSettingsHttpService } from './app.settings';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export function app_Init(appSettingsHttpService: AppSettingsHttpService): () => void {
  return () => appSettingsHttpService.initializeApp();
}

@NgModule({ declarations: [
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        RouterModule,
        FontAwesomeModule,
        AppComponent], providers: [
        provideAppInitializer(() => {
        const initializerFn = (app_Init)(inject(AppSettingsHttpService));
        return initializerFn();
      }),
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {
}
