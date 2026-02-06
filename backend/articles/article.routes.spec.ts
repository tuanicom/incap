import chai from 'chai';
import sinon from 'sinon';
import * as request from 'supertest';
import rewiremock from 'rewiremock';
import * as express from 'express';
import ArticleController from './article.controller';

describe("ArticleRoutes", () => {
  const route = "/articles";
  const id = "123";
  const app = express();
  let controllerMock: sinon.SinonMock = sinon.mock(ArticleController);

  const articles = [
    { _id: "123", title: "article1" },
    { _id: "456", title: "article2" }
  ];

  // rewiremock
  before(async () => {
    const value: any = await rewiremock.around(
      () => import('./article.routes'),
      mock => {
        mock(() => import('./article.controller')).withDefault(ArticleController);
      }
    );
    app.use(route, value.default);
  });

  beforeEach(() => rewiremock.enable());
  afterEach(() => rewiremock.disable());

  beforeEach(() => controllerMock = sinon.mock(ArticleController));
  afterEach(() => controllerMock.restore());

  describe(`get ${route}/`, () => {

    before(() => controllerMock.expects("getAll").twice().resolves(articles));
    after(() => controllerMock.verify());

    describe('with no parameters', () => {
      it("should get the list from controller and return json", () => {
        request(app)
          .get(`${route}/`)
          .expect('Content-Type', /json/)
          .expect(200, function (err, res) {
            chai.expect(res.body).to.deep.equal(articles);
          });
      });
    });

    describe('with category parameters', () => {
      it("should get the list from controller and return json", () => {
        request(app)
          .get(`${route}/?category=test`)
          .expect('Content-Type', /json/)
          .expect(200, function (err, res) {
            chai.expect(res.body).to.deep.equal(articles);
          });
      });
    });
  });

  describe(`get ${route}/${id}`, () => {

    before(() => controllerMock.expects("getById").once().withArgs(id).resolves(articles[0]));
    after(() => controllerMock.verify());

    it("should get the item from controller and return json", () => {
      request(app)
        .get(`${route}/${id}`)
        .expect('Content-Type', /json/)
        .expect(200, function (err, res) {
          chai.expect(res.body).to.deep.equal(articles[0]);
        });
    });
  });

  describe(`post ${route}`, () => {

    before(() => controllerMock.expects("add").once().resolves(articles[0]));
    after(() => controllerMock.verify());

    it("should add the item from controller and return json", () => {
      request(app)
        .post(`${route}/`)
        .send(articles[0])
        .expect('Content-Type', /json/)
        .expect(200, function (err, res) {
          chai.expect(res.body).to.deep.equal(articles[0]);
        });
    });
  });

  describe(`put ${route}/`, () => {

    before(() => controllerMock.expects("update").once().resolves(articles[0]));
    after(() => controllerMock.verify());

    it("should update the item from controller and return json", () => {
      request(app)
        .put(`${route}/`)
        .send(articles[0])
        .expect('Content-Type', /json/)
        .expect(200, function (err, res) {
          chai.expect(res.body).to.deep.equal(articles[0]);
        });
    });
  });

  describe(`delete ${route}/${id}`, () => {

    before(() => controllerMock.expects("delete").once().withArgs(id).resolves(articles[0]));
    after(() => controllerMock.verify());

    it("should delete the item from controller and return json", () => {
      request(app)
        .delete(`${route}/${id}`)
        .expect('Content-Type', /json/)
        .expect(200, function (err, res) {
          chai.expect(res.body).to.deep.equal(articles[0]);
        });
    });
  });
});
