import type { Mock } from "vitest";
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { UsersComponent } from '../users.component';
import { ListComponent } from '../components/list/list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user';
import { lastValueFrom } from 'rxjs';
import * as Observable from 'rxjs';
import { AppSettingsService } from 'src/app/app.settings';

describe('UserService', () => {
    let httpClientSpy: {
        get: Mock;
        post: Mock;
        put: Mock;
        delete: Mock;
    };
    let service: UserService;

    beforeEach(async () => {
        httpClientSpy = {
            get: vi.fn().mockName("HttpClient.get"),
            post: vi.fn().mockName("HttpClient.post"),
            put: vi.fn().mockName("HttpClient.put"),
            delete: vi.fn().mockName("HttpClient.delete")
        };

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [FontAwesomeModule,
                ReactiveFormsModule,
                BrowserModule,
                RouterModule.forRoot([], {}),
                UsersComponent,
                ListComponent],
            providers: [
                UserService,
                { provide: HttpClient, useValue: httpClientSpy },
                { provide: AppSettingsService, useValue: { settings: { usersApiUrl: 'http://localhost:4000/users' } } },
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        }).compileComponents();
    });

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
            httpClientSpy.get.mockReturnValueOnce(Observable.of<User[]>(data));
            service = TestBed.inject(UserService);
        });

        it('should call http://localhost:4000/users with no parameter', () => {

            service.getUsers();

            expect(httpClientSpy.get).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.get).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0].length).toBe(1);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0][0]).toBe('http://localhost:4000/users');
        });

        it('should return a list of users', async () => {
            const userService = TestBed.inject(UserService);
            const result = await lastValueFrom(userService.getUsers());
            expect(result.length).toBe(2);
            expect(result[0]).toBe(data[0]);
            expect(result[1]).toBe(data[1]);
        });
    });

    describe('when calling getUserById', () => {
        const data = {
            id: '1234',
            name: 'user1'
        } as User;

        beforeEach(() => {
            httpClientSpy.get.mockReturnValueOnce(Observable.of<User>(data));
            service = TestBed.inject(UserService);
        });

        it('should call http://localhost:4000/users with id parameter', () => {

            service.getUserById('1234');

            expect(httpClientSpy.get).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.get).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0].length).toBe(1);
            expect(vi.mocked(httpClientSpy.get).mock.calls[0][0]).toBe('http://localhost:4000/users/1234');
        });

        it('should return a user', async () => {
            const userService = TestBed.inject(UserService);
            const result = await lastValueFrom(userService.getUserById('1234'));
            expect(result).toBeTruthy();
            expect(result.id).toBe(data.id);
            expect(result.name).toBe(data.name);
        });
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
            httpClientSpy.post.mockReturnValueOnce(Observable.of<User>(output));
            service = TestBed.inject(UserService);
        });

        it('should call http://localhost:4000/users with user parameter', () => {

            service.addUser(input);

            expect(httpClientSpy.post).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.post).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.post).mock.calls[0].length).toBe(2);
            expect(vi.mocked(httpClientSpy.post).mock.calls[0][0]).toBe('http://localhost:4000/users');
            expect(vi.mocked(httpClientSpy.post).mock.calls[0][1]).toBe(input);
        });

        it('should return a user', async () => {
            const userService = TestBed.inject(UserService);
            const result = await lastValueFrom(userService.addUser(input));
            expect(result).toBeTruthy();
            expect(result.id).toBe(output.id);
            expect(result.name).toBe(output.name);
        });
    });

    describe('when calling updateUser', () => {
        const data = {
            id: 'id1',
            name: 'user1'
        } as User;

        beforeEach(() => {
            httpClientSpy.put.mockReturnValueOnce(Observable.of<User>(data));
            service = TestBed.inject(UserService);
        });

        it('should call http://localhost:4000/users with user parameter', () => {

            service.updateUser(data);

            expect(httpClientSpy.put).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.put).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.put).mock.calls[0].length).toBe(2);
            expect(vi.mocked(httpClientSpy.put).mock.calls[0][0]).toBe('http://localhost:4000/users');
            expect(vi.mocked(httpClientSpy.put).mock.calls[0][1]).toBe(data);
        });

        it('should return a user', async () => {
            const userService = TestBed.inject(UserService);
            const result = await lastValueFrom(userService.updateUser(data));
            expect(result).toBeTruthy();
            expect(result).toBe(data);
        });
    });

    describe('when calling deleteUser', () => {

        beforeEach(() => {
            httpClientSpy.delete;
            service = TestBed.inject(UserService);
        });

        it('should call http://localhost:4000/users with user parameter', () => {

            service.deleteUser('id');

            expect(httpClientSpy.delete).toHaveBeenCalled();
            expect(vi.mocked(httpClientSpy.delete).mock.calls.length).toBe(1);
            expect(vi.mocked(httpClientSpy.delete).mock.calls[0].length).toBe(1);
            expect(vi.mocked(httpClientSpy.delete).mock.calls[0][0]).toBe('http://localhost:4000/users/id');
        });
    });
});
