import * as chai from 'chai';
import * as sinon from 'sinon';
import rewiremock from 'rewiremock';
import { ArticleProcess } from './article.process';
import articleModel, { Article } from './article.model';

describe("ArticleProcess", () => {
  let process: ArticleProcess;
  let modelMock: sinon.SinonMock;
  const id = "123";

  // rewiremock
  before(() => {
    rewiremock.around(
      () => import('./article.process'),
      mock => {
        mock(() => import('./article.model')).withDefault(articleModel);
      }
    ).then((value: any) => {
      process = value.default;
    });
  });
  beforeEach(() => rewiremock.enable());
  afterEach(() => rewiremock.disable());

  beforeEach(() => modelMock = sinon.mock(articleModel));
  afterEach(() => modelMock.verify());

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

  describe("getAll(category)", () => {
    let findSpy: sinon.SinonExpectation;
    let execSpy: sinon.SinonSpy;
    const query = { exec: () => { } };

    beforeEach(() => {
      findSpy = modelMock.expects("find").once().withArgs({ category: "category" });
      const stub = findSpy.returns(query);
      execSpy = sinon.spy(query, "exec");
    });

    it("should call the find() method of the model with category parameter", () => {
      process.getAll("category").then(() => {
        findSpy.verify();
        chai.expect(execSpy.calledOnce).to.be.true;
      });
    });
  });

  describe(`getById("${id}")`, () => {
    let findByIdSpy: sinon.SinonExpectation;
    let execSpy: sinon.SinonSpy;
    const query = { exec: () => { } };

    beforeEach(() => {
      findByIdSpy = modelMock.expects("findById").once().withArgs(id);
      findByIdSpy.returns(query);
      sinon.spy(query, "exec");
    });

    it(`should get the item with id "${id}" from model using findById `, () => {
      process.getById(id).then(() => {
        findByIdSpy.verify();
        chai.expect(execSpy.calledOnce).to.be.true;
      });
    });
  });

  describe("save()", () => {
    let saveSpy: sinon.SinonSpy;
    const input = <Article>{ _id: id, title: "test", save: () => { } };

    beforeEach(() => saveSpy = sinon.spy(input, "save"));

    it("should call the save function of the model", () => {
      process.save(input).then(() => {
        chai.expect(saveSpy.calledOnce).to.be.true;
      });
    });
  });

  describe(`delete("${id}")`, () => {
    let findOneAndDeleteSpy: sinon.SinonExpectation;
    let execSpy: sinon.SinonSpy;
    const query = { exec: () => { } };

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
