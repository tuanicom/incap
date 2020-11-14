import { TestBed, waitForAsync } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CategoryService } from './services/category.service';
import { APP_BASE_HREF } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

describe('CategoriesComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoriesComponent,
        ListComponent,
        EditComponent
      ],
      imports: [
        FontAwesomeModule
,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        NgbModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' })
      ],
      providers: [
        CategoryService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CategoriesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
