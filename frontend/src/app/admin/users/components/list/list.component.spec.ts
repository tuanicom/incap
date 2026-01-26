import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as Observable from 'rxjs';

describe('Users > ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let userServiceSpy: {
    getUsers: jasmine.Spy,
    deleteUser: jasmine.Spy,
  };
  let routerSpy: {
    navigate: jasmine.Spy,
  };

  beforeEach(waitForAsync(() => {

    userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'deleteUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
    declarations: [
    ],
    imports: [FontAwesomeModule,
        ReactiveFormsModule,
        BrowserModule,
        NgbModule,
        ListComponent],
    providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {} },
        provideHttpClient(withInterceptorsFromDi())
    ]
});
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    component.ngOnInit();
    expect(userServiceSpy.getUsers).toHaveBeenCalled();
  });

  describe('when adding a new user', () => {
    it('should navigate to /users/add', () => {
      component.addUser();
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(routerSpy.navigate.calls.count()).toBe(1);
      expect(routerSpy.navigate.calls.first().args.length).toBe(2);
      expect(routerSpy.navigate.calls.first().args[0].length).toBe(1);
      expect(routerSpy.navigate.calls.first().args[0][0]).toBe('../add');
    });
  });

  describe('when deleting an existing user with id 1', () => {
    beforeEach(() => {
      userServiceSpy.deleteUser.and.returnValue(Observable.of<object>({}));
      userServiceSpy.getUsers.calls.reset();
      component.deleteUser('1');
    });

    it('should call delete function of userservice with id 1', () => {
      expect(userServiceSpy.deleteUser).toHaveBeenCalled();
      expect(userServiceSpy.deleteUser.calls.count()).toBe(1);
      expect(userServiceSpy.deleteUser.calls.first().args.length).toBe(1);
      expect(userServiceSpy.deleteUser.calls.first().args[0]).toBe('1');
    });

    it('should reload users list after', () => {
      expect(userServiceSpy.getUsers).toHaveBeenCalled();
      expect(userServiceSpy.getUsers.calls.count()).toBe(1);
    });
  });
});
