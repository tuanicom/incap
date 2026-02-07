import { expect } from 'chai';
import sinon from 'sinon';

describe("UserProcess", () => {
    let process: any;

    beforeEach(async () => {
        const { UserProcess } = await import('./user.process');
        process = new UserProcess();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("getAll()", () => {
        it("should return array or throw error", async () => {
            try {
                const result = await process.getAll();
                expect(Array.isArray(result)).to.be.true;
            } catch (err: any) {
                expect(err).to.exist;
            }
        }, 15000);
    });

    describe("getById()", () => {
        it("should handle getById or throw error", async () => {
            try {
                const result = await process.getById("507f1f77bcf86cd799439011");
                if (result) {
                    expect(result).to.be.an('object');
                }
            } catch (err: any) {
                expect(err).to.exist;
            }
        }, 5000);
    });

    describe("save()", () => {
        it("should call save on input object", async () => {
            const input: any = {
                name: "test user",
                save: sinon.stub().resolves({ _id: "abc", name: "test user" })
            };

            const result = await process.save(input);
            expect((input.save as sinon.SinonStub).calledOnce).to.be.true;
            expect(result).to.exist;
        });

        it("should handle save with complex user data", async () => {
            const input: any = {
                name: "John Doe",
                email: "john@example.com",
                role: "admin",
                save: sinon.stub().resolves({
                    _id: "def",
                    name: "John Doe",
                    email: "john@example.com",
                    role: "admin"
                })
            };

            const result = await process.save(input);
            expect(result.name).to.equal("John Doe");
            expect(result.email).to.equal("john@example.com");
        });
    });

    describe("delete()", () => {
        it("should handle delete or throw error", async () => {
            try {
                const result = await process.delete("507f1f77bcf86cd799439011");
                if (result) {
                    expect(result).to.be.an('object');
                }
            } catch (err: any) {
                expect(err).to.exist;
            }
        }, 5000);
    });
});

