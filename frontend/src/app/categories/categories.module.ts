import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './categories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './components/list/list.component';
import { CategoryService } from './services/category.service'
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AddComponent } from './components/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'categories', component: ListComponent },
  { path: 'categories/edit/:id', component: EditComponent },
  { path: 'categories/add', component: AddComponent },
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    CategoriesComponent,
    ListComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [CategoryService],
})
export class CategoriesModule {
}
