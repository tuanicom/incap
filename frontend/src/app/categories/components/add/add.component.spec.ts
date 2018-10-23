import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import { CategoriesComponent } from '../../categories.component';
import { ListComponent } from '../list/list.component';
import { EditComponent } from '../edit/edit.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { APP_BASE_HREF } from '@angular/common';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddComponent,
        CategoriesComponent,
        ListComponent,
        EditComponent
      ],
      imports: [
        AngularFontAwesomeModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        NgbModule.forRoot(),
        RouterModule.forRoot([])
      ],
      providers: [
        CategoryService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
