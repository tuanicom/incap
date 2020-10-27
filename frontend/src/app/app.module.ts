import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppSettingsHttpService } from './app.settings';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export function app_Init(appSettingsHttpService: AppSettingsHttpService): () => Promise<any> {
  return () => appSettingsHttpService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: app_Init, deps: [AppSettingsHttpService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
