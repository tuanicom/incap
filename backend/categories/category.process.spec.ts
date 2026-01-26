import * as chai from 'chai';
import * as sinon from 'sinon';
import rewiremock from 'rewiremock';
import { CategoryProcess } from './category.process';
import categoryModel, { Category } from './category.model';

describe("CategoryProcess", () => {
    let process: CategoryProcess;
    let modelMock: sinon.SinonMock;

    // rewiremock
    before(async () => {
        const value: any = await rewiremock.around(
            () => import('./category.process'),
            mock => {
                mock(() => import('./category.model'))
                    .withDefault(categoryModel);
            }
        );
        process = value.default;
    });
    beforeEach(() => rewiremock.enable());
    afterEach(() => rewiremock.disable());

    beforeEach(() => modelMock = sinon.mock(categoryModel));
    afterEach(() => modelMock.restore());

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

    describe("getById(\"123\")", () => {
        let findByIdSpy: sinon.SinonExpectation;
        let execSpy: sinon.SinonSpy;
        const query = { exec: () => { } };
        const id = "123";

        beforeEach(() => {
            findByIdSpy = modelMock.expects("findById").once().withArgs(id);
            findByIdSpy.returns(query);
            execSpy = sinon.spy(query, "exec");
        });

        it("should get the item with id \"123\" from model using findById ", () => {
            process.getById(id).then(() => {
                findByIdSpy.verify();
                chai.expect(execSpy.calledOnce).to.be.true;
            });
        });
    });

    describe("save()", () => {
        let saveSpy: sinon.SinonSpy;
        const input : Partial<Category> = {
            _id: "123",
            title: "test",
            description: "test",
            save: () => Promise.resolve(input as Category)
        };

        beforeEach(() => saveSpy = sinon.spy(input, "save"));

        it("should call the save function of the model", () => {
            process.save(input as Category).then(() => {
                chai.expect(saveSpy.calledOnce).to.be.true;
            });
        });
    });

    describe("delete(\"123\")", () => {
        let findOneAndDeleteSpy: sinon.SinonExpectation;
        let execSpy: sinon.SinonSpy;
        const query = { exec: () => { } };
        const id = "123";

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
