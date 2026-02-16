import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';
import { CommentListComponent } from '../comments/comment-list/comment-list.component';
import { ArticleService } from './services/article.service';


@NgModule({ declarations: [
    ], imports: [CommonModule,
        ReactiveFormsModule,
        ArticlesRoutingModule,
        FontAwesomeModule,
        ArticlesComponent,
        ListComponent,
        EditComponent,
        CommentListComponent,
        AddComponent], providers: [ArticleService, provideHttpClient(withInterceptorsFromDi())] })
export class ArticlesModule { }
