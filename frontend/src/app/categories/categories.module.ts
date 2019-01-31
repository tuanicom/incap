import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './categories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './components/list/list.component';
import { CategoryService } from './services/category.service';
import { EditComponent } from './components/edit/edit.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AddComponent } from './components/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  declarations: [
    CategoriesComponent,
    ListComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    CategoriesRoutingModule
  ],
  providers: [CategoryService]
})
export class CategoriesModule {
}
