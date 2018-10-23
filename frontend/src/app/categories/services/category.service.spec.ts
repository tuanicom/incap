import { TestBed, async } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { CategoriesComponent } from '../categories.component';
import { ListComponent } from '../components/list/list.component';
import { EditComponent } from '../components/edit/edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';

describe('CategoryService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
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

  it('should be created', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service).toBeTruthy();
  });
});
