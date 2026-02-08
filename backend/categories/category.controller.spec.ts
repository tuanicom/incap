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

    it("should return results from process.getAll()", async () => {
      const categories = [
        { _id: "1", title: "Tech" },
        { _id: "2", title: "News" }
      ];
      processMock.getAll.resolves(categories);
      const result = await controller.getAll();
      expect(result).to.deep.equal(categories);
      expect(result.length).to.equal(2);
    });

    it("should handle empty results", async () => {
      processMock.getAll.resolves([]);
      const result = await controller.getAll();
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });
  });

  describe("getById(\"123\")", () => {
    const id = "123";

    it("should get the item with id \"123\" from process", async () => {
      processMock.getById.resolves({} as any);
      await controller.getById(id);
      expect(processMock.getById.calledWith(id)).to.be.true;
    });

    it("should return category with correct id", async () => {
      const category = { _id: id, title: "Technology" };
      processMock.getById.resolves(category);
      const result = await controller.getById(id);
      expect(result._id).to.equal(id);
      expect(result.title).to.equal("Technology");
    });

    it("should handle category not found", async () => {
      processMock.getById.resolves(null);
      const result = await controller.getById("nonexistent");
      expect(result).to.be.null;
    });
  });

  describe("add()", () => {
    const input = { title: "test", description: "test" };

    it("should call the save function of the process", async () => {
      processMock.save.resolves({} as any);
      await controller.add(input);
      expect(processMock.save.calledOnce).to.be.true;
    });

    it("should return saved category", async () => {
      const saved = { _id: "new", ...input };
      processMock.save.resolves(saved);
      const result = await controller.add(input);
      expect(result._id).to.equal("new");
      expect(result.title).to.equal("test");
    });

    it("should handle add with minimal data", async () => {
      const minimal = { title: "New Category" };
      processMock.save.resolves({ _id: "1", ...minimal });
      const result = await controller.add(minimal);
      expect(result.title).to.equal("New Category");
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

    it("should update all fields", async () => {
      const existing = { _id: id, title: "Old", description: "Old Desc" };
      const updates = { _id: id, title: "New", description: "New Desc" };
      processMock.getById.resolves(existing);
      processMock.save.resolves(updates);

      await controller.update(updates);
      expect(existing.title).to.equal("New");
      expect(processMock.save.called).to.be.true;
    });

    it("should handle updates only changing title", async () => {
      const original = { _id: id, title: "Original", description: "Same" };
      const partial = { _id: id, title: "Updated" };
      processMock.getById.resolves({ ...original });
      processMock.save.resolves({ ...original, title: "Updated" });

      await controller.update(partial);
      expect(processMock.save.called).to.be.true;
    });
  });

  describe("delete(\"123\")", () => {
    const id = "123";

    it("should delete the item with id \"123\" in process", async () => {
      processMock.delete.resolves({} as any);
      await controller.delete(id);
      expect(processMock.delete.calledWith(id)).to.be.true;
    });

    it("should return deleted category", async () => {
      const deleted = { _id: id, title: "Deleted Category" };
      processMock.delete.resolves(deleted);
      const result = await controller.delete(id);
      expect(result._id).to.equal(id);
      expect(result.title).to.equal("Deleted Category");
    });

    it("should handle deletion of non-existent category", async () => {
      processMock.delete.resolves(null);
      const result = await controller.delete("nonexistent");
      expect(result).to.be.null;
    });

    it("should be callable multiple times", async () => {
      processMock.delete.resolves({ _id: "1" });
      await controller.delete("1");
      await controller.delete("2");
      expect(processMock.delete.callCount).to.equal(2);
    });
  });
});
