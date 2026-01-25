import * as chai from 'chai';
import * as sinon from 'sinon';
import rewiremock from 'rewiremock';
import { UserController } from './user.controller';
import UserProcess from './user.process';

describe("UserController", () => {
  let controller: UserController;
  let processMock: sinon.SinonMock;

  // rewiremock
  before(async () => {
    const value: any = await rewiremock.around(
      () => import('./user.controller'),
      mock => {
        mock(() => import('./user.process')).withDefault(UserProcess);
      }
    );
    controller = value.default;
  });

  beforeEach(() => rewiremock.enable());
  afterEach(() => rewiremock.disable());

  beforeEach(() => processMock = sinon.mock(UserProcess));
  afterEach(() => processMock.restore());

  describe("getAll()", () => {
    let getAllSpy: sinon.SinonExpectation;

    beforeEach(() => getAllSpy = processMock.expects("getAll").once());

    it("should get the list from process", () => {
      controller.getAll().then(() => getAllSpy.verify());
    });
  });

  describe("getById(\"123\")", () => {
    let getByIdSpy: sinon.SinonExpectation;
    const id = "123";

    beforeEach(() => getByIdSpy = processMock.expects("getById").once().withArgs(id));

    it("should get the item with id \"123\" from process", () => {
      controller.getById(id).then(() => getByIdSpy.verify());
    });
  });

  describe("add()", () => {
    let saveSpy: sinon.SinonExpectation;
    const input = { title: "test", description: "test" };

    beforeEach(() => saveSpy = processMock.expects("save").once().withArgs(input));

    it("should call the save function of the process", () => {
      controller.add(input).then(() => saveSpy.verify());
    });
  });

  describe("update()", () => {
    let saveSpy: sinon.SinonExpectation;
    let getByIdSpy: sinon.SinonExpectation;
    const id = "123";
    const user = { _id: id, name: "test" };
    const input = { _id: id, name: "test2" };

    beforeEach(() => {
      getByIdSpy = processMock.expects("getById").once().withArgs(id);
      getByIdSpy.resolves(user);
      saveSpy = processMock.expects("save").once().withArgs(user);
    });


    it(`should call the getById function of the process with "${id}"`, async () => {
      await controller.update(input);
      getByIdSpy.verify();
    });

    it("should call the save function of the process", async () => {
      await controller.update(input);
      chai.expect(user.name).to.equal(input.name);
      saveSpy.verify();
    });
  });

  describe("delete(\"123\")", () => {
    let deleteSpy: sinon.SinonExpectation;
    const id = "123";

    beforeEach(() => deleteSpy = processMock.expects("delete").once().withArgs(id));

    it("should delete the item with id \"123\" in process", () => {
      controller.delete(id).then(() => deleteSpy.verify());
    });
  });
});
