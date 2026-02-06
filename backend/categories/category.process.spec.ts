import { expect } from 'chai';
import sinon from 'sinon';
import { CategoryProcess } from './category.process';
import categoryModel, { Category } from './category.model';

describe("CategoryProcess", () => {
    let process: CategoryProcess;
    let modelStub: sinon.SinonStubbedInstance<typeof categoryModel>;

    beforeEach(() => {
        modelStub = sinon.stub(categoryModel);
        process = new CategoryProcess();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("getAll()", () => {
        it("should call the find() method of the model", async () => {
            const query = { exec: sinon.stub().resolves([]) };
            (modelStub.find as sinon.SinonStub).returns(query);

            await process.getAll();
            expect((modelStub.find as sinon.SinonStub).calledOnce).to.be.true;
        });
    });

    describe("getById(\"123\")", () => {
        const id = "123";

        it("should get the item with id \"123\" from model using findById ", async () => {
            const query = { exec: sinon.stub().resolves({} as Category) };
            (modelStub.findById as sinon.SinonStub).returns(query);

            await process.getById(id);
            expect((modelStub.findById as sinon.SinonStub).calledWith(id)).to.be.true;
        });
    });

    describe("save()", () => {
        it("should call the save function of the model", async () => {
            const input: Category = {
                _id: "123",
                title: "test",
                description: "test",
                save: sinon.stub().resolves({} as Category)
            } as any;

            await process.save(input);
            expect((input.save as sinon.SinonStub).calledOnce).to.be.true;
        });
    });

    describe("delete(\"123\")", () => {
        const id = "123";

        it(`should delete the item with id "${id}" in model using findOneAndDelete`, async () => {
            const query = { exec: sinon.stub().resolves({} as Category) };
            (modelStub.findOneAndDelete as sinon.SinonStub).returns(query);

            await process.delete(id);
            expect((modelStub.findOneAndDelete as sinon.SinonStub).calledWith({ _id: id })).to.be.true;
        });
    });
});
