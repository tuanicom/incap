import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { CategoriesComponent } from '../categories.component';
import { ListComponent } from '../components/list/list.component';
import { EditComponent } from '../components/edit/edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

describe('CategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      CategoriesComponent,
      ListComponent,
      EditComponent
    ],
    imports: [
      BrowserModule,
      HttpClientModule,
      NgbModule.forRoot(),
      RouterModule.forRoot([])
    ],
    providers: [
      CategoryService,
      { provide: APP_BASE_HREF, useValue: '/' }
    ],
  }));

  it('should be created', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service).toBeTruthy();
  });
});
