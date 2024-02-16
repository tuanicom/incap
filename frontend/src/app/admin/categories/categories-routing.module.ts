import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { AddComponent } from './components/add/add.component';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path: '', component: CategoriesComponent, children: [
      { path: 'list', component: ListComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'add', component: AddComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
