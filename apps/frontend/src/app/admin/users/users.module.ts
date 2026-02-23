import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { UserService } from './services/user.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';


@NgModule({ declarations: [
    ], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        UsersRoutingModule,
        FontAwesomeModule,
        UsersComponent,
        ListComponent,
        AddComponent], providers: [UserService, provideHttpClient(withInterceptorsFromDi())] })
export class UsersModule { }
