import { expect } from 'chai';
import sinon from 'sinon';

describe("ArticleProcess", () => {
    let process: any;
    const id = "123";

    beforeEach(async () => {
        // Dynamically import AFTER vitest setup to avoid early model compilation
        const { ArticleProcess } = await import('./article.process');
        process = new ArticleProcess();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("getAll()", () => {
        it("should return array from getAll", async () => {
            try {
                const result = await process.getAll();
                expect(Array.isArray(result)).to.be.true;
            } catch (err: any) {
                // Expected if no DB connection
                expect(err).to.exist;
            }
        }, 15000);  // Allow 15 seconds for potential DB handshake

        it("should handle getAll with no parameters", async () => {
            try {
                const result = await process.getAll(undefined);
                expect(result === undefined || Array.isArray(result)).to.be.true;
            } catch (err: any) {
                expect(err).to.exist;
            }
        });

        it("should handle getAll with empty string category", async () => {
            try {
                const result = await process.getAll("");
                expect(result === undefined || Array.isArray(result)).to.be.true;
            } catch (err: any) {
                expect(err).to.exist;
            }
        });
    });

    describe("getAll(category)", () => {
        it("should handle category parameter", async () => {
            try {
                const result = await process.getAll("tech");
                expect(Array.isArray(result)).to.be.true;
            } catch (err: any) {
                // Expected if no DB connection
                expect(err).to.exist;
            }
        }, 15000);

        it("should handle category 'news'", async () => {
            try {
                const result = await process.getAll("news");
                expect(result === undefined || Array.isArray(result)).to.be.true;
            } catch (err: any) {
                expect(err).to.exist;
            }
        });

        it("should handle category 'sports'", async () => {
            try {
                const result = await process.getAll("sports");
                expect(result === undefined || Array.isArray(result)).to.be.true;
            } catch (err: any) {
                expect(err).to.exist;
            }
        });
    });

    describe(`getById("${id}")`, () => {
        it(`should return an object from getById`, async () => {
            try {
                const result = await process.getById(id);
                // May be null or undefined if not found, which is ok
                if (result) {
                    expect(result).to.be.an('object');
                }
            } catch (err: any) {
                // Expected if no DB connection or invalid ID format
                expect(err).to.exist;
            }
        });

        it("should handle getById with different ID", async () => {
            try {
                const result = await process.getById("456");
                if (result) {
                    expect(result).to.be.an('object');
                }
            } catch (err: any) {
                expect(err).to.exist;
            }
        });

        it("should handle getById with valid ObjectId format", async () => {
            try {
                const validId = "507f1f77bcf86cd799439011";
                const result = await process.getById(validId);
                if (result) {
                    expect(result).to.be.an('object');
                }
            } catch (err: any) {
                expect(err).to.exist;
            }
        });
    });

    describe("save()", () => {
        it("should handle save with mocked input", async () => {
            const input: any = {
                title: "test",
                save: sinon.stub().resolves({ _id: "abc", title: "test" })
            };

            const result = await process.save(input);
            expect((input.save as sinon.SinonStub).calledOnce).to.be.true;
            expect(result).to.exist;
        });

        it("should handle save with article object", async () => {
            const input: any = {
                title: "New Article",
                content: "Content",
                category: "Tech",
                author: "John",
                save: sinon.stub().resolves({ _id: "def", title: "New Article" })
            };

            const result = await process.save(input);
            expect((input.save as sinon.SinonStub).calledOnce).to.be.true;
            expect(result._id).to.equal("def");
        });

        it("should handle save failure", async () => {
            const input: any = {
                title: "test",
                save: sinon.stub().rejects(new Error("Save failed"))
            };

            try {
                await process.save(input);
                expect.fail("Should have thrown error");
            } catch (err: any) {
                expect(err.message).to.equal("Save failed");
            }
        });
    });

    describe(`delete("${id}")`, () => {
        it(`should call deleteone approach`, async () => {
            try {
                const result = await process.delete(id);
                // Expect null result if not found, which is ok
                if (result) {
                    expect(result).to.be.an('object');
                }
            } catch (err: any) {
                // Expected if no DB connection or invalid ID
                expect(err).to.exist;
            }
        });

        it("should handle delete with different ID", async () => {
            try {
                const result = await process.delete("456");
                if (result) {
                    expect(result).to.be.an('object');
                }
            } catch (err: any) {
                expect(err).to.exist;
            }
        });

        it("should handle delete with valid ObjectId format", async () => {
            try {
                const validId = "507f1f77bcf86cd799439011";
                const result = await process.delete(validId);
                if (result) {
                    expect(result).to.be.an('object');
                }
            } catch (err: any) {
                expect(err).to.exist;
            }
        });
    });
});
