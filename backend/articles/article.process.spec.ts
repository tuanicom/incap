import * as chai from 'chai';
import * as spy from 'chai-spies';
import rewiremock from 'rewiremock';
import { IArticleProcess } from './article.process';
import { IArticle } from './article.model';
import { Model } from 'mongoose';

chai.use(spy);

describe("ArticleProcess", () => {
    let process: IArticleProcess;
    const daoMock = <Model<IArticle>>{};
    const sandbox = chai.spy.sandbox();

    // rewiremock
    before(() => {
        rewiremock.around(
            () => import('./article.process'),
            mock => {
                mock(() => import('./article.model'))
                    .withDefault(daoMock);
            }
        ).then((value: any) => {
            process = value.default;
        });
    });
    beforeEach(() => rewiremock.enable());
    afterEach(() => rewiremock.disable());

    describe("getAll()", () => {
        let findSpy;
        const query = {};

        beforeEach(() => {
            findSpy = sandbox.on(daoMock, "find", () => query);
            sandbox.on(query, "exec");
        });
        afterEach(() => sandbox.restore());

        it("should call the find() method of the model", () => {
            process.getAll().then(() => chai.expect(findSpy).to.have.been.called());
        });
    });

    describe("getAll(category)", () => {
        let findSpy;
        const query = {};

        beforeEach(() => {
            findSpy = sandbox.on(daoMock, "find", () => query);
            sandbox.on(query, "exec");
        });
        afterEach(() => sandbox.restore());

        it("should call the find() method of the model with category parameter", () => {
            process.getAll("category").then(() => chai.expect(findSpy).to.have.been.called.with({category: "categorey"}));
        });
    });
    describe("getById(\"123\")", () => {
        let findByIdSpy;
        const id = "123";
        const query = {};

        beforeEach(() => {
            findByIdSpy = sandbox.on(daoMock, "findById", () => query);
            sandbox.on(query, "exec");
        });
        afterEach(() => sandbox.restore());

        it("should get the item with id \"123\" from model using findById ", () => {
            process.getById(id).then(() => {
                chai.expect(findByIdSpy).to.have.been.called();
                chai.expect(findByIdSpy).to.have.been.called.with(id);
            });
        });
    });

    describe("save()", () => {
        let saveSpy;
        const input = <IArticle>{_id: "123", title: "test"};

        beforeEach(() => saveSpy = sandbox.on(input, "save"));
        afterEach(() => sandbox.restore());

        it("should call the save function of the model", () => {
            process.save(input).then(() => {
                chai.expect(saveSpy).to.have.been.called();
            });
        });
    });

    describe("delete(\"123\")", () => {
        let findOneAndDeleteSpy;
        const id = "123";
        const query = {};

        beforeEach(() => {
            findOneAndDeleteSpy = sandbox.on(daoMock, "findOneAndDelete", () => query);
            sandbox.on(query, "exec");
        });
        afterEach(() => sandbox.restore());

        it("should delete the item with id \"123\" in model using findOneAndDelete", () => {
            process.delete(id).then(() => {
                chai.expect(findOneAndDeleteSpy).to.have.been.called();
                chai.expect(findOneAndDeleteSpy).to.have.been.called.with({_id: id});
            });
        });
    });
});
