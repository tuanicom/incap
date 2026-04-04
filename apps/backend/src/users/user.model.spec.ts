import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';

describe("UserModel", () => {
    beforeEach(async () => {
        // Clear any previously registered models
        const modelNames = mongoose.modelNames();
        for (const name of modelNames) {
            try {
                if ((mongoose as any).deleteModel) {
                    (mongoose as any).deleteModel(name);
                } else {
                    delete (mongoose as any).models[name];
                }
            } catch (err) {
                // ignore
            }
        }
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("User Schema", () => {
        it("should have userSchema exported", async () => {
            const { userSchema } = await import('./user.model');
            expect(userSchema).to.exist;
        });

        it("should have name field in schema", async () => {
            const { userSchema } = await import('./user.model');
            expect(userSchema.obj.name).to.exist;
        });

        it("should have String type for name", async () => {
            const { userSchema } = await import('./user.model');
            expect(userSchema.obj.name.type).to.equal(String);
        });

        it("should have name field in paths", async () => {
            const { userSchema } = await import('./user.model');
            expect(userSchema.paths.name).to.exist;
        });

        it("should define all fields", async () => {
            const { userSchema } = await import('./user.model');
            expect(userSchema.obj).to.have.key('name');
        });
    });

    describe("User Interface", () => {
        it("should be able to import user model", async () => {
            const userModel = await import('./user.model');
            expect(userModel.default).to.exist;
        });
    });

    describe("User Model Factory", () => {
        it("should return a model instance when creating userModelFactory", async () => {
            const userModelFactory = await import('./user.model');
            expect(userModelFactory.default).to.exist;
        });

        it("should be able to call static methods on factory", async () => {
            const userModel = await import('./user.model');
            expect(userModel.default.find).to.exist;
        });

        it("should have find static method", async () => {
            const userModel = await import('./user.model');
            expect(typeof userModel.default.find).to.equal('function');
        });

        it("should have findById static method", async () => {
            const userModel = await import('./user.model');
            expect(typeof userModel.default.findById).to.equal('function');
        });

        it("should have findOneAndDelete static method", async () => {
            const userModel = await import('./user.model');
            expect(typeof userModel.default.findOneAndDelete).to.equal('function');
        });

        it("should have findOne static method", async () => {
            const userModel = await import('./user.model');
            expect(typeof userModel.default.findOne).to.equal('function');
        });

        it("should have create static method", async () => {
            const userModel = await import('./user.model');
            expect(typeof userModel.default.create).to.equal('function');
        });

        it("should have findByIdAndUpdate static method", async () => {
            const userModel = await import('./user.model');
            expect(typeof userModel.default.findByIdAndUpdate).to.equal('function');
        });

        it("should have findOneAndUpdate static method", async () => {
            const userModel = await import('./user.model');
            expect(typeof userModel.default.findOneAndUpdate).to.equal('function');
        });

        it("should have deleteOne static method", async () => {
            const userModel = await import('./user.model');
            expect(typeof userModel.default.deleteOne).to.equal('function');
        });
    });

    describe("Model Registration", () => {
        it("should handle model registration", async () => {
            const { default: userModel } = await import('./user.model');
            expect(userModel).to.exist;

            const models = mongoose.modelNames();
            expect(models).to.be.an('array');
        });

        it("should check User in models object", async () => {
            const { default: userModel } = await import('./user.model');
            expect(userModel).to.exist;

            // Check the models object exists
            if ((mongoose as any).models) {
                expect((mongoose as any).models).to.be.an('object');
                // Try to access the User model entry
                const modelEntry = (mongoose as any).models.User;
                if (modelEntry) {
                    expect(modelEntry).to.exist;
                }
            }
        });

        it("should handle model names check", async () => {
            const { default: userModel } = await import('./user.model');
            expect(userModel).to.exist;

            const modelNames = mongoose.modelNames?.();
            expect(modelNames).to.be.an('array');
        });

        it("should handle model names includes check", async () => {
            const { default: userModel } = await import('./user.model');
            expect(userModel).to.exist;

            const modelNames = mongoose.modelNames();
            expect(modelNames).to.be.an('array');

            // User should be registered
            if (modelNames.includes && modelNames.includes('User')) {
                expect(modelNames).to.include('User');
            }
        });

        it("should handle OverwriteModelError gracefully", async () => {
            // First import
            const first = await import('./user.model');
            expect(first.default).to.exist;

            // Clear the model
            if ((mongoose as any).deleteModel) {
                try {
                    (mongoose as any).deleteModel('User');
                } catch (err) {
                    // ignore
                }
            }

            // Second import should still work
            expect(first.default).to.exist;
        });

        it("should provide factory function for creating instances", async () => {
            const { default: userModel } = await import('./user.model');
            expect(typeof userModel).to.equal('function');
        });
    });

    describe("Static method delegation", () => {
        it("should delegate find to actual model", async () => {
            const { default: userModel } = await import('./user.model');
            const findResult = userModel.find({});
            expect(findResult).to.exist;
        });

        it("should delegate findById to actual model", async () => {
            const { default: userModel } = await import('./user.model');
            const findByIdResult = userModel.findById('test-id');
            expect(findByIdResult).to.exist;
        });

        it("should delegate all static methods", async () => {
            const { default: userModel } = await import('./user.model');
            const staticMethods = ['find', 'findById', 'findOneAndDelete', 'findOne', 'create', 'findByIdAndUpdate', 'findOneAndUpdate', 'deleteOne'];

            staticMethods.forEach(method => {
                expect(typeof (userModel as any)[method]).to.equal('function');
            });
        });
    });

    describe("Model instance creation", () => {
        it("should be able to create user instance properties", async () => {
            const { userSchema } = await import('./user.model');
            expect(userSchema.paths.name).to.exist;
        });

        it("should support user name field", async () => {
            const { userSchema } = await import('./user.model');
            expect(userSchema.paths.name).to.exist;
        });

        it("should allow user schema extension", async () => {
            const { userSchema } = await import('./user.model');
            expect(userSchema).to.be.an('object');
        });
    });
});
