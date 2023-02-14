import * as chai from 'chai';
import * as spy from 'chai-spies';
import * as request from 'supertest';
import rewiremock from 'rewiremock';
import * as express from 'express';
import { IArticleController } from './article.controller';
import { IArticle } from './article.model';

chai.use(spy);

describe("ArticleRoutes", () => {
    const app = express();
    const controllerMock = <IArticleController>{};
    const routePrefix = "/categories";

    const articles = [
        <IArticle>{_id: "123", title: "article1"},
        <IArticle>{_id: "456", title: "article2"}
    ];
    // rewiremock
    before(() => {
        rewiremock.around(
            () => import('./article.routes'),
            mock => {
                mock(() => import('./article.controller'))
                    .withDefault(controllerMock);
            }
        ).then((value: any) => {
            app.use(routePrefix, value.default);
        });
    });
    beforeEach(() => rewiremock.enable());
    afterEach(() => rewiremock.disable());

    describe(`get ${routePrefix}/`, () => {
        beforeEach(() => chai.spy.on(controllerMock, "getAll", () => Promise.resolve(articles)));

        it("should get the list from controller and return json", () => {
            request(app)
                .get(routePrefix + "/")
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(articles);
                });
        });
    });

    describe(`get ${routePrefix}/?category=test`, () => {
        // beforeEach(() => chai.spy.on(controllerMock, "getAll", () => Promise.resolve(articles)));

        it("should get the list from controller and return json", () => {
            request(app)
                .get(routePrefix + "/?category=test")
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(articles);
                });
        });
    });

    describe(`get ${routePrefix}/123`, () => {
        beforeEach(() => chai.spy.on(controllerMock, "getById", () => Promise.resolve(articles[0])));

        it("should get the item from controller and return json", () => {
            request(app)
                .get(routePrefix + "/123")
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(articles[0]);
                });
        });
    });

    describe(`post ${routePrefix}/`, () => {

        beforeEach(() => chai.spy.on(controllerMock, "add", () => Promise.resolve(articles[0])));

        it("should add the item from controller and return json", () => {
            request(app)
                .post(routePrefix + "/")
                .send(articles[0])
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(articles[0]);
                });
        });
    });

    describe(`put ${routePrefix}/`, () => {
        beforeEach(() => chai.spy.on(controllerMock, "update", () => Promise.resolve(articles[0])));

        it("should update the item from controller and return json", () => {
            request(app)
                .put(routePrefix + "/")
                .send(articles[0])
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(articles[0]);
                });
        });
    });

    describe(`delete ${routePrefix}/123`, () => {
        beforeEach(() => chai.spy.on(controllerMock, "delete", () => Promise.resolve(articles[0])));

        it("should delete the item from controller and return json", () => {
            request(app)
                .delete(routePrefix + "/123")
                .expect('Content-Type', /json/)
                .expect(200, function (err, res) {
                    chai.expect(res.body).to.deep.equal(articles[0]);
                });
        });
    });
});
