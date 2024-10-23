import * as chai from 'chai';
import * as sinon from 'sinon';
import * as request from 'supertest';
import rewiremock from 'rewiremock';
import * as express from 'express';
import UserController from './user.controller';

describe("UserRoutes", () => {
  const app = express();
  let controllerMock: sinon.SinonMock = sinon.mock(UserController);
  const routePrefix = "/users";

  const users = [
    { _id: "123", name: "user1" },
    { _id: "456", name: "user2" }
  ];
  // rewiremock
  before(() => {
    rewiremock.around(
      () => import('./user.routes'),
      mock => {
        mock(() => import('./user.controller')).withDefault(UserController);
      }
    ).then((value: any) => {
      app.use(routePrefix, value.default);
    });
  });
  beforeEach(() => rewiremock.enable());
  afterEach(() => rewiremock.disable());

  beforeEach(() => controllerMock = sinon.mock(UserController));
  afterEach(() => controllerMock.verify());

  describe(`get ${routePrefix}/`, () => {

    before(() => controllerMock.expects("getAll").resolves(users));
    after(() => controllerMock.verify());

    it("should get the list from controller and return json", () => {
      request(app)
        .get(routePrefix + "/")
        .expect('Content-Type', /json/)
        .expect(200, function (err, res) {
          chai.expect(res.body).to.deep.equal(users);
        });
    });
  });

  describe(`get ${routePrefix}/123`, () => {

    before(() => controllerMock.expects("getById").resolves(users[0]));
    after(() => controllerMock.verify());

    it("should get the item from controller and return json", () => {
      request(app)
        .get(routePrefix + "/123")
        .expect('Content-Type', /json/)
        .expect(200, function (err, res) {
          chai.expect(res.body).to.deep.equal(users[0]);
        });
    });
  });

  describe(`post ${routePrefix}/`, () => {

    before(() => controllerMock.expects("add").resolves(users[0]));
    after(() => controllerMock.verify());

    it("should add the item from controller and return json", () => {
      request(app)
        .post(routePrefix + "/")
        .send(users[0])
        .expect('Content-Type', /json/)
        .expect(200, function (err, res) {
          chai.expect(res.body).to.deep.equal(users[0]);
        });
    });
  });

  describe(`put ${routePrefix}/`, () => {

    before(() => controllerMock.expects("update").resolves(users[0]));
    after(() => controllerMock.verify());

    it("should update the item from controller and return json", () => {
      request(app)
        .put(routePrefix + "/")
        .send(users[0])
        .expect('Content-Type', /json/)
        .expect(200, function (err, res) {
          chai.expect(res.body).to.deep.equal(users[0]);
        });
    });
  });

  describe(`delete ${routePrefix}/123`, () => {

    before(() => controllerMock.expects("delete").resolves(users[0]));
    after(() => controllerMock.verify());

    it("should delete the item from controller and return json", () => {
      request(app)
        .delete(routePrefix + "/123")
        .expect('Content-Type', /json/)
        .expect(200, function (err, res) {
          chai.expect(res.body).to.deep.equal(users[0]);
        });
    });
  });
});
