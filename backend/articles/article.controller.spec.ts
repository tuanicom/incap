import { expect } from 'chai';
import sinon from "sinon";

describe("ArticleController", () => {
  let controller: any;
  let processMock: any;
  const id = "123";

  beforeEach(async () => {
    // Create a minimal mock process object
    processMock = {
      getAll: sinon.stub().resolves([]),
      getById: sinon.stub().resolves({}),
      save: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({})
    };

    // Now import and create controller with mock
    const { ArticleController } = await import('./article.controller');
    controller = new ArticleController(processMock);
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

  describe("getAll(category)", () => {
    it("should get the list from process with category parameter", async () => {
      processMock.getAll.resolves([]);
      await controller.getAll("category");
      expect(processMock.getAll.calledWith("category")).to.be.true;
    });
  });

  describe(`getById("${id}")`, () => {
    it(`should get the item with id "${id}" from process`, async () => {
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
    const article = { _id: id, title: "test", content: "test", category: "test", author: "test" };
    const input = { _id: id, title: "test2", content: "test2", category: "test2", author: "test2" };

    it(`should call the getById function of the process with "${id}"`, async () => {
      processMock.getById.resolves(article as any);
      processMock.save.resolves(article as any);
      await controller.update(input);
      expect(processMock.getById.calledWith(id)).to.be.true;
    });

    it("should call the save function of the process", async () => {
      processMock.getById.resolves(article as any);
      processMock.save.resolves(article as any);
      await controller.update(input);
      expect(article.title).to.equal(input.title);
      expect(article.content).to.equal(input.content);
      expect(processMock.save.calledOnce).to.be.true;
    });
  });

  describe(`delete("${id}")`, () => {
    it(`should delete the item with id "${id}" in process`, async () => {
      processMock.delete.resolves({} as any);
      await controller.delete(id);
      expect(processMock.delete.calledWith(id)).to.be.true;
    });
  });
});
