import { expect } from 'chai';
import sinon from 'sinon';
import { ArticleProcess } from './article.process';
import articleModel, { Article } from './article.model';

describe("ArticleProcess", () => {
    let process: ArticleProcess;
    let modelStub: sinon.SinonStubbedInstance<typeof articleModel>;
    const id = "123";

    beforeEach(() => {
        modelStub = sinon.stub(articleModel);
        process = new ArticleProcess();
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

    describe("getAll(category)", () => {
        it("should call the find() method of the model with category parameter", async () => {
            const query = { exec: sinon.stub().resolves([]) };
            (modelStub.find as sinon.SinonStub).returns(query);

            await process.getAll("category");
            expect((modelStub.find as sinon.SinonStub).calledWith({ category: "category" })).to.be.true;
        });
    });

    describe(`getById("${id}")`, () => {
        it(`should get the item with id "${id}" from model using findById `, async () => {
            const query = { exec: sinon.stub().resolves({} as Article) };
            (modelStub.findById as sinon.SinonStub).returns(query);

            await process.getById(id);
            expect((modelStub.findById as sinon.SinonStub).calledWith(id)).to.be.true;
        });
    });

    describe("save()", () => {
        it("should call the save function of the model", async () => {
            const input: Article = {
                _id: id,
                title: "test",
                content: "test",
                category: "test",
                author: "test",
                save: sinon.stub().resolves({} as Article)
            } as any;

            await process.save(input);
            expect((input.save as sinon.SinonStub).calledOnce).to.be.true;
        });
    });

    describe(`delete("${id}")`, () => {
        it(`should delete the item with id "${id}" in model using findOneAndDelete`, async () => {
            const query = { exec: sinon.stub().resolves({} as Article) };
            (modelStub.findOneAndDelete as sinon.SinonStub).returns(query);

            await process.delete(id);
            expect((modelStub.findOneAndDelete as sinon.SinonStub).calledWith({ _id: id })).to.be.true;
        });
    });
});
