import * as chai from 'chai';
import * as spy from 'chai-spies';
import * as request from 'supertest';
import rewiremock from 'rewiremock';
import * as express from 'express';
import { IUserController } from './user.controller';
import { IUser } from './user.model';

chai.use(spy);

describe("UserRoutes", () => {
    const app = express();
    const controllerMock = <IUserController>{};
    const routePrefix = "/categories";

    const categories = [
        <IUser>{_id: "123", name: "user1"},
        <IUser>{_id: "456", name: "user2"}
    ];
    // rewiremock
    before(() => {
        rewiremock.around(
            () => import('./user.routes'),
            mock => {
                mock(() => import('./user.controller'))
                    .withDefault(controllerMock);
            }
        ).then((value: any) => {
            app.use(routePrefix, value.default);
        });
    });
    beforeEach(() => rewiremock.enable());
    afterEach(() => rewiremock.disable());

    describe(`get ${routePrefix}/`, () => {
        beforeEach(() => chai.spy.on(controllerMock, "getAll", () => Promise.resolve(categories)));

        it("should get the list from controller and return json", () => {
            request(app)
                .get(routePrefix + "/")
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(categories);
                });
        });
    });

    describe(`get ${routePrefix}/123`, () => {
        beforeEach(() => chai.spy.on(controllerMock, "getById", () => Promise.resolve(categories[0])));

        it("should get the item from controller and return json", () => {
            request(app)
                .get(routePrefix + "/123")
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(categories[0]);
                });
        });
    });

    describe(`post ${routePrefix}/`, () => {

        beforeEach(() => chai.spy.on(controllerMock, "add", () => Promise.resolve(categories[0])));

        it("should add the item from controller and return json", () => {
            request(app)
                .post(routePrefix + "/")
                .send(categories[0])
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(categories[0]);
                });
        });
    });

    describe(`put ${routePrefix}/`, () => {
        beforeEach(() => chai.spy.on(controllerMock, "update", () => Promise.resolve(categories[0])));

        it("should update the item from controller and return json", () => {
            request(app)
                .put(routePrefix + "/")
                .send(categories[0])
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(categories[0]);
                });
        });
    });

    describe(`delete ${routePrefix}/123`, () => {
        beforeEach(() => chai.spy.on(controllerMock, "delete", () => Promise.resolve(categories[0])));

        it("should delete the item from controller and return json", () => {
            request(app)
                .delete(routePrefix + "/123")
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(categories[0]);
                });
        });
    });
});
