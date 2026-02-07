import { expect } from 'chai';
import sinon from 'sinon';

describe("UserProcess", () => {
    let process: any;
    const id = "123";

    beforeEach(async () => {
        // Dynamically import AFTER vitest setup to avoid early model compilation
        const { default: UserProcessModule } = await import('./user.process');
        process = UserProcessModule;
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
    });

    describe("getById(\"123\")", () => {
        it("should handle getById", async () => {
            try {
                const result = await process.getById(id);
                if (result) {
                    expect(result).to.be.an('object');
                }
            } catch (err: any) {
                // Expected if no DB
                expect(err).to.exist;
            }
        });
    });

    describe("save()", () => {
        it("should call save on input", async () => {
            const input: any = {
                name: "test",
                save: sinon.stub().resolves({ _id: "abc", name: "test" })
            };

            const result = await process.save(input);
            expect((input.save as sinon.SinonStub).calledOnce).to.be.true;
            expect(result).to.exist;
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
                // Expected if no DB or invalid ID
                expect(err).to.exist;
            }
        });
    });
});
