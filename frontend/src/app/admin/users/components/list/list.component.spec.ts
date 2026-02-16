import type { Mock } from "vitest";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as Observable from 'rxjs';

describe('Users > ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;
    let userServiceSpy: {
        getUsers: Mock;
        deleteUser: Mock;
    };
    let routerSpy: {
        navigate: Mock;
    };

    beforeEach(async () => {

        userServiceSpy = {
            getUsers: vi.fn().mockName("UserService.getUsers"),
            deleteUser: vi.fn().mockName("UserService.deleteUser")
        };
        routerSpy = {
            navigate: vi.fn().mockName("Router.navigate")
        };

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [FontAwesomeModule,
                ReactiveFormsModule,
                BrowserModule,
                ListComponent],
            providers: [
                { provide: UserService, useValue: userServiceSpy },
                { provide: Router, useValue: routerSpy },
                { provide: ActivatedRoute, useValue: {} },
                provideHttpClient(withInterceptorsFromDi())
            ]
        }).compileComponents();
    });

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
            expect(vi.mocked(routerSpy.navigate).mock.calls.length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0].length).toBe(2);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0].length).toBe(1);
            expect(vi.mocked(routerSpy.navigate).mock.calls[0][0][0]).toBe('../add');
        });
    });

    describe('when deleting an existing user with id 1', () => {
        beforeEach(() => {
            userServiceSpy.deleteUser.mockReturnValue(Observable.of<object>({}));
            userServiceSpy.getUsers.mockClear();
            component.deleteUser('1');
        });

        it('should call delete function of userservice with id 1', () => {
            expect(userServiceSpy.deleteUser).toHaveBeenCalled();
            expect(vi.mocked(userServiceSpy.deleteUser).mock.calls.length).toBe(1);
            expect(vi.mocked(userServiceSpy.deleteUser).mock.calls[0].length).toBe(1);
            expect(vi.mocked(userServiceSpy.deleteUser).mock.calls[0][0]).toBe('1');
        });

        it('should reload users list after', () => {
            expect(userServiceSpy.getUsers).toHaveBeenCalled();
            expect(vi.mocked(userServiceSpy.getUsers).mock.calls.length).toBe(1);
        });
    });
});
