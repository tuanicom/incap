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

    it("should return results from process.getAll()", async () => {
      const articles = [
        { _id: "1", title: "Article 1", category: "Tech" },
        { _id: "2", title: "Article 2", category: "News" }
      ];
      processMock.getAll.resolves(articles);
      const result = await controller.getAll();
      expect(result).to.deep.equal(articles);
      expect(result.length).to.equal(2);
    });

    it("should handle empty results", async () => {
      processMock.getAll.resolves([]);
      const result = await controller.getAll();
      expect(result).to.be.an('array');
      expect(result.length).to.equal(0);
    });
  });

  describe("getAll(category)", () => {
    it("should get the list from process with category parameter", async () => {
      processMock.getAll.resolves([]);
      await controller.getAll("category");
      expect(processMock.getAll.calledWith("category")).to.be.true;
    });

    it("should pass Tech category to process", async () => {
      processMock.getAll.resolves([]);
      await controller.getAll("Tech");
      expect(processMock.getAll.firstCall.args[0]).to.equal("Tech");
    });

    it("should return category filtered results", async () => {
      const techArticles = [{ _id: "1", title: "Article 1", category: "Tech" }];
      processMock.getAll.resolves(techArticles);
      const result = await controller.getAll("Tech");
      expect(result[0].category).to.equal("Tech");
    });
  });

  describe(`getById("${id}")`, () => {
    it(`should get the item with id "${id}" from process`, async () => {
      processMock.getById.resolves({} as any);
      await controller.getById(id);
      expect(processMock.getById.calledWith(id)).to.be.true;
    });

    it(`should return article with id "${id}"`, async () => {
      const article = { _id: id, title: "Article", content: "Content" };
      processMock.getById.resolves(article);
      const result = await controller.getById(id);
      expect(result._id).to.equal(id);
      expect(result.title).to.equal("Article");
    });

    it("should handle article not found", async () => {
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

    it("should pass input to process.save()", async () => {
      processMock.save.resolves({ _id: "new", ...input });
      await controller.add(input);
      expect(processMock.save.firstCall.args[0]).to.exist;
    });

    it("should return saved article", async () => {
      const saved = { _id: "123", ...input };
      processMock.save.resolves(saved);
      const result = await controller.add(input);
      expect(result._id).to.equal("123");
    });

    it("should handle articles with all fields", async () => {
      const fullArticle = {
        title: "Full Article",
        content: "Content",
        category: "Tech",
        author: "John"
      };
      processMock.save.resolves({ _id: "1", ...fullArticle });
      const result = await controller.add(fullArticle);
      expect(result.category).to.equal("Tech");
      expect(result.author).to.equal("John");
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

    it("should update all article fields", async () => {
      const existing = { _id: id, title: "Old", content: "Old", category: "Old", author: "Old" };
      const updates = { _id: id, title: "New", content: "New", category: "New", author: "New" };
      processMock.getById.resolves(existing);
      processMock.save.resolves(updates);

      await controller.update(updates);
      expect(existing.title).to.equal("New");
      expect(processMock.save.calledOnce).to.be.true;
    });

    it("should handle partial updates", async () => {
      const original = { _id: id, title: "Original", content: "Content", category: "Tech", author: "John" };
      const partial = { _id: id, title: "Updated" };
      processMock.getById.resolves({ ...original });
      processMock.save.resolves({ ...original, title: "Updated" });

      await controller.update(partial);
      expect(processMock.save.called).to.be.true;
    });
  });

  describe(`delete("${id}")`, () => {
    it(`should delete the item with id "${id}" in process`, async () => {
      processMock.delete.resolves({} as any);
      await controller.delete(id);
      expect(processMock.delete.calledWith(id)).to.be.true;
    });

    it("should return the deleted article", async () => {
      const deleted = { _id: id, title: "Deleted" };
      processMock.delete.resolves(deleted);
      const result = await controller.delete(id);
      expect(result._id).to.equal(id);
      expect(result.title).to.equal("Deleted");
    });

    it("should handle deletion of non-existent article", async () => {
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
