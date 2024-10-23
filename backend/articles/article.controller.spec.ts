import * as chai from 'chai';
import * as sinon from "sinon";
import { ArticleController } from './article.controller';
import ArticleProcess from './article.process';
import rewiremock from 'rewiremock';

describe("ArticleController", () => {
  let controller: ArticleController;
  let processMock: sinon.SinonMock;
  const id = "123";
  // rewiremock
  before(() => {
    rewiremock.around(
      () => import('./article.controller'),
      mock => {
        mock(() => import('./article.process')).withDefault(ArticleProcess);
      }
    ).then((value: any) => {
      controller = value.default;
    });
  });

  beforeEach(() => rewiremock.enable());
  afterEach(() => rewiremock.disable());

  beforeEach(() => processMock = sinon.mock(ArticleProcess));
  afterEach(() => processMock.verify());

  describe("getAll()", () => {
    let getAllSpy: sinon.SinonExpectation;

    beforeEach(() => getAllSpy = processMock.expects("getAll").once());

    it("should get the list from process", () => {
      controller.getAll().then(() => getAllSpy.verify());
    });
  });

  describe("getAll(category)", () => {
    let getAllSpy: sinon.SinonExpectation;

    beforeEach(() => getAllSpy = processMock.expects("getAll").once().withArgs("category"));

    it("should get the list from process", () => {
      controller.getAll("category").then(() => getAllSpy.verify());
    });
  });

  describe(`getById("${id}")`, () => {
    let getByIdSpy: sinon.SinonExpectation;

    beforeEach(() => getByIdSpy = processMock.expects("getById").once().withArgs(id));

    it(`should get the item with id "${id}" from process`, () => {
      controller.getById(id).then(() => getByIdSpy.verify());
    });
  });

  describe("add()", () => {
    let saveSpy: sinon.SinonExpectation;
    const input = { title: "test", description: "test" };

    beforeEach(() => saveSpy = processMock.expects("save").once());

    it("should call the save function of the process", () => {
      controller.add(input).then(() => saveSpy.verify());
    });
  });

  describe("update()", () => {
    let saveSpy: sinon.SinonExpectation;
    let getByIdSpy: sinon.SinonExpectation;

    const article = { _id: id, title: "test", content: "test", category: "test", author: "test" };
    const input = { _id: id, title: "test2", content: "test2", category: "test2", author: "test2" };

    beforeEach(() => {
      getByIdSpy = processMock.expects("getById").once().withArgs(id);
      getByIdSpy.resolves(article);
      saveSpy = processMock.expects("save").once().withArgs(article);
    });

    it(`should call the getById function of the process with "${id}"`, async () => {
      await controller.update(input);
      getByIdSpy.verify();
    });

    it("should call the save function of the process", async () => {
      await controller.update(input);
      chai.expect(article.title).to.equal(input.title);
      chai.expect(article.content).to.equal(input.content);
      saveSpy.verify();
    });
  });

  describe(`delete("${id}")`, () => {
    let deleteSpy: any;

    beforeEach(() => deleteSpy = processMock.expects("delete").once().withArgs(id));

    it(`should delete the item with id "${id}" in process`, () => {
      controller.delete(id).then(() => deleteSpy.verify());
    });
  });
});
