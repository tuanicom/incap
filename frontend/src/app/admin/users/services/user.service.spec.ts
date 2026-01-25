import { TestBed, waitForAsync, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { UsersComponent } from '../users.component';
import { ListComponent } from '../components/list/list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user';
import * as Observable from 'rxjs';
import { AppSettingsService } from 'src/app/app.settings';

describe('UserService', () => {
  let httpClientSpy: {
    get: jasmine.Spy,
    post: jasmine.Spy,
    put: jasmine.Spy,
    delete: jasmine.Spy,
  };
  let service: UserService;

  beforeEach(waitForAsync(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
    declarations: [
    ],
    imports: [FontAwesomeModule,
        ReactiveFormsModule,
        BrowserModule,
        NgbModule,
        RouterModule.forRoot([], {}),
        UsersComponent,
        ListComponent],
    providers: [
        UserService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: AppSettingsService, useValue: { settings: { usersApiUrl: 'http://localhost:4000/users' } } },
        { provide: APP_BASE_HREF, useValue: '/' }
    ]
});
  }));

  it('should be created', () => {
    service = TestBed.inject(UserService);
    expect(service).toBeTruthy();
  });

  describe('when calling getUsers', () => {
    const data = [{
      id: '1234',
      name: 'user1'
    }, {
      id: '5678',
      name: 'user2'
    }] as User[];

    beforeEach(() => {
      httpClientSpy.get.and.returnValues(Observable.of<User[]>(data));
      service = TestBed.inject(UserService);
    });

    it('should call http://localhost:4000/users with no parameter', () => {

      service.getUsers();

      expect(httpClientSpy.get).toHaveBeenCalled();
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args.length).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toBe('http://localhost:4000/users');
    });

    it('should return a list of users', waitForAsync(inject([UserService], (userService) => {
      userService.getUsers().subscribe(result => {
        expect(result.length).toBe(2);
        expect(result[0]).toBe(data[0]);
        expect(result[1]).toBe(data[1]);
      });
    })));
  });

  describe('when calling getUserById', () => {
    const data = {
      id: '1234',
      name: 'user1'
    } as User;

    beforeEach(() => {
      httpClientSpy.get.and.returnValues(Observable.of<User>(data));
      service = TestBed.inject(UserService);
    });

    it('should call http://localhost:4000/users with id parameter', () => {

      service.getUserById('1234');

      expect(httpClientSpy.get).toHaveBeenCalled();
      expect(httpClientSpy.get.calls.count()).toBe(1);
      expect(httpClientSpy.get.calls.first().args.length).toBe(1);
      expect(httpClientSpy.get.calls.first().args[0]).toBe('http://localhost:4000/users/1234');
    });

    it('should return a user', waitForAsync(inject([UserService], (userService) => {
      userService.getUsers().subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.id).toBe(data.id);
        expect(result.name).toBe(data.name);
      });
    })));
  });

  describe('when calling addUser', () => {
    const input = {
      name: 'user1'
    } as User;

    const output = {
      id: 'id1',
      name: 'name1'
    } as User;


    beforeEach(() => {
      httpClientSpy.post.and.returnValues(Observable.of<User>(output));
      service = TestBed.inject(UserService);
    });

    it('should call http://localhost:4000/users with user parameter', () => {

      service.addUser(input);

      expect(httpClientSpy.post).toHaveBeenCalled();
      expect(httpClientSpy.post.calls.count()).toBe(1);
      expect(httpClientSpy.post.calls.first().args.length).toBe(2);
      expect(httpClientSpy.post.calls.first().args[0]).toBe('http://localhost:4000/users');
      expect(httpClientSpy.post.calls.first().args[1]).toBe(input);
    });

    it('should return a user', waitForAsync(inject([UserService], (userService) => {
      userService.addUser(input).subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.id).toBe(output.id);
        expect(result.name).toBe(output.name);
      });
    })));
  });

  describe('when calling updateUser', () => {
    const data = {
      id: 'id1',
      name: 'user1'
    } as User;

    beforeEach(() => {
      httpClientSpy.put.and.returnValues(Observable.of<User>(data));
      service = TestBed.inject(UserService);
    });

    it('should call http://localhost:4000/users with user parameter', () => {

      service.updateUser(data);

      expect(httpClientSpy.put).toHaveBeenCalled();
      expect(httpClientSpy.put.calls.count()).toBe(1);
      expect(httpClientSpy.put.calls.first().args.length).toBe(2);
      expect(httpClientSpy.put.calls.first().args[0]).toBe('http://localhost:4000/users');
      expect(httpClientSpy.put.calls.first().args[1]).toBe(data);
    });

    it('should return a user', waitForAsync(inject([UserService], (userService) => {
      userService.updateUser(data).subscribe(result => {
        expect(result).toBeTruthy();
        expect(result).toBe(data);
      });
    })));
  });

  describe('when calling deleteUser', () => {

    beforeEach(() => {
      httpClientSpy.delete.and.callThrough();
      service = TestBed.inject(UserService);
    });

    it('should call http://localhost:4000/users with user parameter', () => {

      service.deleteUser('id');

      expect(httpClientSpy.delete).toHaveBeenCalled();
      expect(httpClientSpy.delete.calls.count()).toBe(1);
      expect(httpClientSpy.delete.calls.first().args.length).toBe(1);
      expect(httpClientSpy.delete.calls.first().args[0]).toBe('http://localhost:4000/users/id');
    });
  });
});
