import * as chai from 'chai';
import * as spy from 'chai-spies';
import * as request from 'supertest';
import rewiremock from 'rewiremock';
import * as express from 'express';
import { ICommentController } from './comment.controller';
import { IComment } from './comment.model';

chai.use(spy);

describe("CommentRoutes", () => {
    const app = express();
    const controllerMock = <ICommentController>{};
    const routePrefix = "/categories";

    const comments = [
        <IComment>{_id: "123", content: "comment1"},
        <IComment>{_id: "456", content: "comment2"}
    ];
    // rewiremock
    before(() => {
        rewiremock.around(
            () => import('./comment.routes'),
            mock => {
                mock(() => import('./comment.controller'))
                    .withDefault(controllerMock);
            }
        ).then((value: any) => {
            app.use(routePrefix, value.default);
        });
    });
    beforeEach(() => rewiremock.enable());
    afterEach(() => rewiremock.disable());

    describe(`get ${routePrefix}/`, () => {
        let getAllSpy: any;
        before(() => getAllSpy = chai.spy.on(controllerMock, "getAll", () => Promise.resolve(comments)));
        describe('with no parameters', () => {
            it("should get the list from controller and return json", () => {
                request(app)
                    .get(routePrefix + "/")
                    .expect('Content-Type', /json/)
                    .expect(200, function (err, res) {
                        chai.expect(res.body).to.deep.equal(comments);
                    });
            });
        });
        describe('with article parameters', () => {
            it("should get the list from controller and return json", () => {
                request(app)
                    .get(routePrefix + "/?article=test")
                    .expect('Content-Type', /json/)
                    .expect(200, function (err, res) {
                        chai.expect(res.body).to.deep.equal(comments);
                    });
            });
        });
    });

    describe(`get ${routePrefix}/123`, () => {
        beforeEach(() => chai.spy.on(controllerMock, "getById", () => Promise.resolve(comments[0])));

        it("should get the item from controller and return json", () => {
            request(app)
                .get(routePrefix + "/123")
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(comments[0]);
                });
        });
    });

    describe(`post ${routePrefix}/`, () => {

        beforeEach(() => chai.spy.on(controllerMock, "add", () => Promise.resolve(comments[0])));

        it("should add the item from controller and return json", () => {
            request(app)
                .post(routePrefix + "/")
                .send(comments[0])
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(comments[0]);
                });
        });
    });

    describe(`put ${routePrefix}/`, () => {
        beforeEach(() => chai.spy.on(controllerMock, "update", () => Promise.resolve(comments[0])));

        it("should update the item from controller and return json", () => {
            request(app)
                .put(routePrefix + "/")
                .send(comments[0])
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(comments[0]);
                });
        });
    });

    describe(`delete ${routePrefix}/123`, () => {
        beforeEach(() => chai.spy.on(controllerMock, "delete", () => Promise.resolve(comments[0])));

        it("should delete the item from controller and return json", () => {
            request(app)
                .delete(routePrefix + "/123")
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(comments[0]);
                });
        });
    });
});
