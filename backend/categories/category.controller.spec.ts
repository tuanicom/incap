import { expect } from 'chai';
import sinon from 'sinon';
import { CategoryController } from './category.controller';
import { CategoryProcess } from './category.process';

describe("CategoryController", () => {
  let controller: CategoryController;
  let processMock: sinon.SinonStubbedInstance<CategoryProcess>;

  beforeEach(() => {
    processMock = sinon.createStubInstance(CategoryProcess);
    controller = new CategoryController(processMock);
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
    const category = { _id: id, title: "test", description: "test" };
    const input = { _id: id, title: "test2", description: "test2" };

    it(`should call the getById function of the process with "${id}"`, async () => {
      processMock.getById.resolves(category as any);
      processMock.save.resolves(category as any);
      await controller.update(input);
      expect(processMock.getById.calledWith(id)).to.be.true;
    });

    it("should call the save function of the process", async () => {
      processMock.getById.resolves(category as any);
      processMock.save.resolves(category as any);
      await controller.update(input);
      expect(category.title).to.equal(input.title);
      expect(category.description).to.equal(input.description);
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
