import { expect } from 'chai';
import sinon from 'sinon';
import { UserController } from './user.controller';
import { UserProcess } from './user.process';

describe.skip("UserController", () => {
  let controller: UserController;
  let processMock: sinon.SinonStubbedInstance<UserProcess>;

  beforeEach(() => {
    processMock = sinon.createStubInstance(UserProcess);
    controller = new UserController(processMock);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getAll()", () => {
    it("should get the list from process", async () => {
      processMock.getAll.resolves([]);
      await controller.getAll();
      expect(processMock.getAll.calledOnce).to.be.true;
    });
  });

  describe("getById(\"123\")", () => {
    const id = "123";

    it("should get the item with id \"123\" from process", async () => {
      processMock.getById.resolves({} as any);
      await controller.getById(id);
      expect(processMock.getById.calledWith(id)).to.be.true;
    });
  });

  describe("add()", () => {
    const input = { title: "test", description: "test" };

    it("should call the save function of the process", async () => {
      processMock.save.resolves({} as any);
      await controller.add(input);
      expect(processMock.save.calledOnce).to.be.true;
    });
  });

  describe("update()", () => {
    const id = "123";
    const user = { _id: id, name: "test" };
    const input = { _id: id, name: "test2" };

    it(`should call the getById function of the process with "${id}"`, async () => {
      processMock.getById.resolves(user as any);
      processMock.save.resolves(user as any);
      await controller.update(input);
      expect(processMock.getById.calledWith(id)).to.be.true;
    });

    it("should call the save function of the process", async () => {
      processMock.getById.resolves(user as any);
      processMock.save.resolves(user as any);
      await controller.update(input);
      expect(user.name).to.equal(input.name);
      expect(processMock.save.calledOnce).to.be.true;
    });
  });

  describe("delete(\"123\")", () => {
    const id = "123";

    it("should delete the item with id \"123\" in process", async () => {
      processMock.delete.resolves({} as any);
      await controller.delete(id);
      expect(processMock.delete.calledWith(id)).to.be.true;
    });
  });
});
