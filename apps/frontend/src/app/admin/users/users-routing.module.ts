import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { ListComponent } from './components/list/list.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      { path: 'list', component: ListComponent },
      { path: 'add', component: AddComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
