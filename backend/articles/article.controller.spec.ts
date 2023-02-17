import * as chai from 'chai';
import * as spy from 'chai-spies';
import rewiremock from 'rewiremock';
import { IArticleController } from './article.controller';
import { IArticleProcess } from './article.process';
import { IArticle } from './article.model';

chai.use(spy);

describe("ArticleController", () => {
    let controller: IArticleController;
    const processMock = <IArticleProcess>{};
    const sandbox = chai.spy.sandbox();

    // rewiremock
    before(() => {
        rewiremock.around(
            () => import('./article.controller'),
            mock => {
                mock(() => import('./article.process'))
                    .withDefault(processMock);
            }
        ).then((value: any) => {
            controller = value.default;
        });
    });
    beforeEach(() => rewiremock.enable());
    afterEach(() => rewiremock.disable());

    describe("getAll()", () => {
        let getAllSpy;

        beforeEach(() => getAllSpy = sandbox.on(processMock, "getAll"));
        afterEach(() => sandbox.restore());

        it("should get the list from process", () => {
            controller.getAll().then(() => chai.expect(getAllSpy).to.have.been.called());
        });
    });

    describe("getAll(category)", () => {
        let getAllSpy;

        beforeEach(() => getAllSpy = sandbox.on(processMock, "getAll"));
        afterEach(() => sandbox.restore());

        it("should get the list from process", () => {
            controller.getAll("category").then(() => chai.expect(getAllSpy).to.have.been.called.with("category"));
        });
    });

    describe("getById(\"123\")", () => {
        let getByIdSpy;
        const id = "123";

        beforeEach(() => getByIdSpy = sandbox.on(processMock, "getById"));
        afterEach(() => sandbox.restore());

        it("should get the item with id \"123\" from process", () => {
            controller.getById(id).then(() => {
                chai.expect(getByIdSpy).to.have.been.called();
                chai.expect(getByIdSpy).to.have.been.called.with(id);
            });
        });
    });

    describe("add()", () => {
        let saveSpy;
        const input = {title: "test", description: "test"};

        beforeEach(() => saveSpy = sandbox.on(processMock, "save"));
        afterEach(() => sandbox.restore());

        it("should call the save function of the process", () => {
            controller.add(input).then(() => {
                chai.expect(saveSpy).to.have.been.called();
            });
        });
    });

    describe("update()", () => {
        let saveSpy;
        let getByIdSpy;
        const id = "123";
        const article = <IArticle>{_id: id, title: "test"};
        const input = {_id: id, title: "test2"};

        beforeEach(() => {
            getByIdSpy = sandbox.on(processMock, "getById", () => Promise.resolve(article));
            saveSpy = sandbox.on(processMock, "save");
        });
        afterEach(() => sandbox.restore());

        it("should call the getById function of the process with \"123\"", () => {
            controller.update(input).then(() => {
                chai.expect(getByIdSpy).to.have.been.called();
                chai.expect(getByIdSpy).to.have.been.called.with(id);
            });
        });

        it("should call the save function of the process", async () => {
            controller.update(input).then(() => chai.expect(saveSpy).to.have.been.called());
        });
    });

    describe("delete(\"123\")", () => {
        let deleteSpy;
        const id = "123";

        beforeEach(() => deleteSpy = sandbox.on(processMock, "delete"));
        afterEach(() => sandbox.restore());

        it("should delete the item with id \"123\" in process", () => {
            controller.delete(id).then(() => {
                chai.expect(deleteSpy).to.have.been.called();
                chai.expect(deleteSpy).to.have.been.called.with(id);
            });
        });
    });
});
