import * as chai from 'chai';
import * as sinon from 'sinon';
import rewiremock from 'rewiremock';
import { UserProcess } from './user.process';
import userModel, { User } from './user.model';

describe("UserProcess", () => {
  let process: UserProcess;
  let modelMock: sinon.SinonMock;

  // rewiremock
  before(() => {
    rewiremock.around(
      () => import('./user.process'),
      mock => {
        mock(() => import('./user.model')).withDefault(userModel);
      }
    ).then((value: any) => {
      process = value.default;
    });
  });
  beforeEach(() => rewiremock.enable());
  afterEach(() => rewiremock.disable());

  beforeEach(() => modelMock = sinon.mock(userModel));
  afterEach(() => modelMock.restore());

  describe("getAll()", () => {
    let findSpy: sinon.SinonExpectation;
    let execSpy: sinon.SinonSpy;
    const query = { exec: () => { } };

    beforeEach(() => {
      findSpy = modelMock.expects("find").once()
      const stub = findSpy.returns(query);
      execSpy = sinon.spy(query, "exec");
    });

    it("should call the find() method of the model", () => {
      process.getAll().then(() => {
        findSpy.verify();
        chai.expect(execSpy.calledOnce).to.be.true;
      });
    });
  });

  describe("getById(\"123\")", () => {
    let findByIdSpy: sinon.SinonExpectation;
    let execSpy: sinon.SinonSpy;
    const query = { exec: () => { } };
    const id = "123";

    beforeEach(() => {
      findByIdSpy = modelMock.expects("findById").once().withArgs(id);
      findByIdSpy.returns(query);
      sinon.spy(query, "exec");
    });

    it("should get the item with id \"123\" from model using findById ", () => {
      process.getById(id).then(() => {
        findByIdSpy.verify();
        chai.expect(execSpy.calledOnce).to.be.true;
      });
    });
  });

  describe("save()", () => {
    let saveSpy: sinon.SinonSpy;
    const input = <User>{ _id: "123", name: "test", save: () => { } };

    beforeEach(() => saveSpy = sinon.spy(input, "save"));

    it("should call the save function of the model", () => {
      process.save(input).then(() => {
        chai.expect(saveSpy.calledOnce).to.be.true;
      });
    });
  });

  describe("delete(\"123\")", () => {
    let findOneAndDeleteSpy: sinon.SinonExpectation;
    let execSpy: sinon.SinonSpy;
    const query = { exec: () => { } };
    const id = "123";

    beforeEach(() => {
      findOneAndDeleteSpy = modelMock.expects("findOneAndDelete").once().withArgs({ _id: id });
      findOneAndDeleteSpy.returns(query);
      execSpy = sinon.spy(query, "exec");
    });

    it(`should delete the item with id "${id}" in model using findOneAndDelete`, () => {
      process.delete(id).then(() => {
        findOneAndDeleteSpy.verify();
        chai.expect(execSpy.calledOnce).to.be.true;
      });
    });
  });
});
