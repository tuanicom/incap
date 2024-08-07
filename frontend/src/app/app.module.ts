import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppSettingsHttpService } from './app.settings';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export function app_Init(appSettingsHttpService: AppSettingsHttpService): () => void {
  return () => appSettingsHttpService.initializeApp();
}

@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        RouterModule,
        NgbModule,
        FontAwesomeModule], providers: [
        { provide: APP_INITIALIZER, useFactory: app_Init, deps: [AppSettingsHttpService], multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {
}
