import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddComponent } from './add.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import * as Observable from 'rxjs';

describe('Users > AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let userServiceSpy: {
    addUser: jasmine.Spy,
  };

  let routerSpy: {
    navigate: jasmine.Spy,
  };

  beforeEach(waitForAsync(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['addUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
    declarations: [
    ],
    imports: [FontAwesomeModule,
        ReactiveFormsModule,
        BrowserModule,
        NgbModule,
        AddComponent],
    providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {} },
        provideHttpClient(withInterceptorsFromDi()),
    ]
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

  it('should init the form', () => {
    expect(component.addUserForm).toBeTruthy();
  });

  describe('when submitting the form', () => {

    beforeEach(() => {
      component.addUserForm.get('name').setValue('test');
      userServiceSpy.addUser.and.returnValue(Observable.of<object>({}));
      component.onSubmit();
    });

    it('should call the add function with user service', () => {
      expect(userServiceSpy.addUser).toHaveBeenCalled();
      expect(userServiceSpy.addUser.calls.count()).toBe(1);
    });

    it('should add a user with the values of the form', () => {
      expect(userServiceSpy.addUser.calls.first().args.length).toBe(1);
      expect((userServiceSpy.addUser.calls.first().args[0] as User).name).toBe('test');
    });

    it('should redirect to the list after', () => {
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(routerSpy.navigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.first().args.length).toBe(2);
      expect(routerSpy.navigate.calls.first().args[0].length).toBe(1);
      expect(routerSpy.navigate.calls.first().args[0][0]).toBe('../list');
    });
  });
});
