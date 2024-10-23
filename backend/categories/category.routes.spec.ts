import * as chai from 'chai';
import * as sinon from 'sinon';
import * as request from 'supertest';
import rewiremock from 'rewiremock';
import * as express from 'express';
import CategoryController from './category.controller';

describe("CategoryRoutes", () => {
  const app = express();
  let controllerMock: sinon.SinonMock = sinon.mock(CategoryController);
  const routePrefix = "/categories";

  const categories = [
    { _id: "123", title: "cat1", description: "desc cat 1" },
    { _id: "456", title: "cat2", description: "desc cat 2" }
  ];
  // rewiremock
  before(() => {
    rewiremock.around(
      () => import('./category.routes'),
      mock => {
        mock(() => import('./category.controller')).withDefault(CategoryController);
      }
    ).then((value: any) => {
      app.use(routePrefix, value.default);
    });
  });
  beforeEach(() => rewiremock.enable());
  afterEach(() => rewiremock.disable());

  beforeEach(() => controllerMock = sinon.mock(CategoryController));
  afterEach(() => controllerMock.verify());

  describe(`get ${routePrefix}/`, () => {

    before(() => controllerMock.expects("getAll").resolves(categories));
    after(() => controllerMock.verify());

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

    before(() => controllerMock.expects("getById").resolves(categories[0]));
    after(() => controllerMock.verify());

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

    before(() => controllerMock.expects("add").resolves(categories[0]));
    after(() => controllerMock.verify());

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

    before(() => controllerMock.expects("update").resolves(categories[0]));
    after(() => controllerMock.verify());

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

    before(() => controllerMock.expects("delete").resolves(categories[0]));
    after(() => controllerMock.verify());

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
