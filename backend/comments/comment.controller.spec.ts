import * as chai from 'chai';
import * as spy from 'chai-spies';
import rewiremock from 'rewiremock';
import { ICommentController } from './comment.controller';
import { ICommentProcess } from './comment.process';
import { IComment } from './comment.model';

chai.use(spy);

describe("CommentController", () => {
    let controller: ICommentController;
    const processMock = <ICommentProcess>{};
    const sandbox = chai.spy.sandbox();

    // rewiremock
    before(() => {
        rewiremock.around(
            () => import('./comment.controller'),
            mock => {
                mock(() => import('./comment.process'))
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
        const input = { content: "test"};

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
        const comment = <IComment>{content: "test"};
        const input = {_id: id, content: "test2"};

        beforeEach(() => {
            getByIdSpy = sandbox.on(processMock, "getById", () => Promise.resolve(comment));
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
