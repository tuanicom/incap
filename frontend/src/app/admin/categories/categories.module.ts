import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CategoriesComponent } from './categories.component';
import { ListComponent } from './components/list/list.component';
import { CategoryService } from './services/category.service';
import { EditComponent } from './components/edit/edit.component';
import { AddComponent } from './components/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesRoutingModule } from './categories-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({ declarations: [
    ], imports: [CommonModule,
        ReactiveFormsModule,
        CategoriesRoutingModule,
        FontAwesomeModule,
        CategoriesComponent,
        ListComponent,
        EditComponent,
        AddComponent], providers: [CategoryService, provideHttpClient(withInterceptorsFromDi())] })
export class CategoriesModule {
}
