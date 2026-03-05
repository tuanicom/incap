import { expect } from 'chai';
import sinon from 'sinon';

describe("CommentController", () => {
  let controller: any;
  let processMock: any;
  const id = "123";

  beforeEach(async () => {
    processMock = {
      getByArticle: sinon.stub().resolves([]),
      getById: sinon.stub().resolves({}),
      save: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({})
    };

    const { CommentController } = await import('./comment.controller');
    controller = new CommentController(processMock);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("getByArticle()", () => {
    it("should call process.getByArticle", async () => {
      processMock.getByArticle.resolves([]);
      await controller.getByArticle('article1');
      expect(processMock.getByArticle.calledOnce).to.be.true;
    });

    it("should return results from process.getByArticle()", async () => {
      const comments = [ { _id: '1', text: 'a' }, { _id: '2', text: 'b' } ];
      processMock.getByArticle.resolves(comments);
      const result = await controller.getByArticle('article1');
      expect(result).to.deep.equal(comments);
    });
  });

  describe(`getById("${id}")`, () => {
    it("should call process.getById with id", async () => {
      processMock.getById.resolves({});
      await controller.getById(id);
      expect(processMock.getById.calledWith(id)).to.be.true;
    });
  });

  describe("add()", () => {
    const input = { text: "New comment", authorId: "u1" };

    it("should call process.save", async () => {
      processMock.save.resolves({ _id: '1', ...input });
      await controller.add('article1', input);
      expect(processMock.save.calledOnce).to.be.true;
    });

    it("should return saved comment", async () => {
      const saved = { _id: '1', ...input };
      processMock.save.resolves(saved);
      const result = await controller.add('article1', input);
      expect(result._id).to.equal('1');
    });
  });

  describe("update()", () => {
    const input = { _id: id, text: "Updated" };

    it("should call process.getById and save", async () => {
      processMock.getById.resolves({ _id: id, text: 'Old', save: sinon.stub().resolves(input) });
      processMock.save.resolves(input);
      await controller.update(input);
      expect(processMock.getById.calledWith(id)).to.be.true;
      expect(processMock.save.called).to.be.true;
    });
  });

  describe(`delete("${id}")`, () => {
    it("should call process.delete with id", async () => {
      processMock.delete.resolves({ _id: id });
      await controller.delete(id);
      expect(processMock.delete.calledWith(id)).to.be.true;
    });
  });
});
