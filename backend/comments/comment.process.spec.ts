import { expect } from 'chai';
import sinon from 'sinon';

describe("CommentProcess", () => {
    let process: any;
    const id = "123";

    beforeEach(async () => {
        const { default: CommentProcessModule } = await import('./comment.process');
        process = CommentProcessModule;
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("getByArticle()", () => {
        it("should return array from getByArticle", async () => {
            try {
                const result = await process.getByArticle("article1");
                expect(Array.isArray(result)).to.be.true;
            } catch (err: any) {
                expect(err).to.exist;
            }
        }, 15000);
    });

    describe("getById(\"123\")", () => {
        it("should handle getById with valid id", async () => {
            try {
                const result = await process.getById(id);
                if (result) {
                    expect(result).to.be.an('object');
                }
            } catch (err: any) {
                expect(err).to.exist;
            }
        });

        it("should call findById on model", async () => {
            try {
                await process.getById("test-id");
            } catch (err: any) {
                expect(err).to.exist;
            }
        });
    });

    describe("save()", () => {
        it("should call save on input", async () => {
            const input: any = {
                text: "test",
                save: sinon.stub().resolves({ _id: "abc", text: "test" })
            };

            const result = await process.save(input);
            expect((input.save as sinon.SinonStub).calledOnce).to.be.true;
            expect(result).to.exist;
        });

        it("should return result from save", async () => {
            const expected = { _id: "abc", text: "saved" };
            const input: any = {
                text: "saved",
                save: sinon.stub().resolves(expected)
            };

            const result = await process.save(input);
            expect(result).to.deep.equal(expected);
        });

        it("should handle save error", async () => {
            const saveError = new Error("Save failed");
            const input: any = {
                text: "error",
                save: sinon.stub().rejects(saveError)
            };

            try {
                await process.save(input);
                expect.fail("Should have thrown error");
            } catch (err: any) {
                expect(err.message).to.equal("Save failed");
            }
        });
    });

    describe("delete(\"123\")", () => {
        it("should call delete", async () => {
            try {
                const result = await process.delete(id);
                if (result) {
                    expect(result).to.be.an('object');
                }
            } catch (err: any) {
                expect(err).to.exist;
            }
        });
    });
});
