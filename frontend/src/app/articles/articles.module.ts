import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { ArticleService } from './services/article.service';


@NgModule({ declarations: [
        ArticlesComponent,
        ListComponent,
        EditComponent,
        AddComponent
    ], imports: [CommonModule,
        ReactiveFormsModule,
        NgbModule,
        ArticlesRoutingModule,
        FontAwesomeModule], providers: [ArticleService, provideHttpClient(withInterceptorsFromDi())] })
export class ArticlesModule { }
