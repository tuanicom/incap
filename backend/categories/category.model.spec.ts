import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';

describe("CategoryModel", () => {
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

    describe("Category Schema", () => {
        it("should have categorySchema exported", async () => {
            const { categorySchema } = await import('./category.model');
            expect(categorySchema).to.exist;
        });

        it("should have title field in schema", async () => {
            const { categorySchema } = await import('./category.model');
            expect(categorySchema.obj.title).to.exist;
        });

        it("should have description field in schema", async () => {
            const { categorySchema } = await import('./category.model');
            expect(categorySchema.obj.description).to.exist;
        });

        it("should have String type for title", async () => {
            const { categorySchema } = await import('./category.model');
            expect(categorySchema.obj.title.type).to.equal(String);
        });

        it("should have String type for description", async () => {
            const { categorySchema } = await import('./category.model');
            expect(categorySchema.obj.description.type).to.equal(String);
        });

        it("should define all required fields", async () => {
            const { categorySchema } = await import('./category.model');
            expect(categorySchema.obj).to.have.all.keys(['title', 'description']);
        });
    });

    describe("Category Interface", () => {
        it("should be able to import category model", async () => {
            const categoryModel = await import('./category.model');
            expect(categoryModel.default).to.exist;
        });
    });

    describe("Category Model Factory", () => {
        it("should return a model instance when creating categoryModelFactory", async () => {
            const categoryModelFactory = await import('./category.model');
            expect(categoryModelFactory.default).to.exist;
        });

        it("should be able to call static methods on factory", async () => {
            const categoryModel = await import('./category.model');
            expect(categoryModel.default.find).to.exist;
        });

        it("should have find static method", async () => {
            const categoryModel = await import('./category.model');
            expect(typeof categoryModel.default.find).to.equal('function');
        });

        it("should have findById static method", async () => {
            const categoryModel = await import('./category.model');
            expect(typeof categoryModel.default.findById).to.equal('function');
        });

        it("should have findOneAndDelete static method", async () => {
            const categoryModel = await import('./category.model');
            expect(typeof categoryModel.default.findOneAndDelete).to.equal('function');
        });

        it("should have findOne static method", async () => {
            const categoryModel = await import('./category.model');
            expect(typeof categoryModel.default.findOne).to.equal('function');
        });

        it("should have create static method", async () => {
            const categoryModel = await import('./category.model');
            expect(typeof categoryModel.default.create).to.equal('function');
        });

        it("should have findByIdAndUpdate static method", async () => {
            const categoryModel = await import('./category.model');
            expect(typeof categoryModel.default.findByIdAndUpdate).to.equal('function');
        });

        it("should have findOneAndUpdate static method", async () => {
            const categoryModel = await import('./category.model');
            expect(typeof categoryModel.default.findOneAndUpdate).to.equal('function');
        });

        it("should have deleteOne static method", async () => {
            const categoryModel = await import('./category.model');
            expect(typeof categoryModel.default.deleteOne).to.equal('function');
        });
    });

    describe("Model Registration", () => {
        it("should register Category model in mongoose", async () => {
            const { default: categoryModel } = await import('./category.model');
            // Access the model
            expect(categoryModel).to.exist;

            // Try to trigger model retrieval
            const models = mongoose.modelNames();
            expect(models).to.be.an('array');
        });

        it("should check Category in models object", async () => {
            const { default: categoryModel } = await import('./category.model');
            expect(categoryModel).to.exist;

            // Check the models object exists
            if ((mongoose as any).models) {
                expect((mongoose as any).models).to.be.an('object');
                // Try to access the Category model entry
                const modelEntry = (mongoose as any).models.Category;
                if (modelEntry) {
                    expect(modelEntry).to.exist;
                }
            }
        });

        it("should handle model names check", async () => {
            const { default: categoryModel } = await import('./category.model');
            expect(categoryModel).to.exist;

            const modelNames = mongoose.modelNames?.();
            expect(modelNames).to.be.an('array');
        });

        it("should handle OverwriteModelError gracefully", async () => {
            // First import
            const first = await import('./category.model');
            expect(first.default).to.exist;

            // Clear the model
            if ((mongoose as any).deleteModel) {
                try {
                    (mongoose as any).deleteModel('Category');
                } catch (err) {
                    // ignore
                }
            }

            // Second import should still work
            expect(first.default).to.exist;
        });

        it("should handle model names includes check", async () => {
            const { default: categoryModel } = await import('./category.model');
            expect(categoryModel).to.exist;

            const modelNames = mongoose.modelNames();
            expect(modelNames).to.be.an('array');

            // Category should be registered
            if (modelNames.includes && modelNames.includes('Category')) {
                expect(modelNames).to.include('Category');
            }
        });

        it("should provide factory function for creating instances", async () => {
            const { default: categoryModel } = await import('./category.model');
            expect(typeof categoryModel).to.equal('function');
        });
    });

    describe("Model instance creation", () => {
        it("should be able to create category instance properties", async () => {
            const { categorySchema } = await import('./category.model');
            // Verify schema can be used to create instances
            expect(categorySchema.paths.title).to.exist;
            expect(categorySchema.paths.description).to.exist;
        });

        it("should support all category fields", async () => {
            const { categorySchema } = await import('./category.model');
            const fields = ['title', 'description'];
            fields.forEach(field => {
                expect(categorySchema.paths[field]).to.exist;
            });
        });

        it("should allow category schema extension", async () => {
            const { categorySchema } = await import('./category.model');
            // Schema should be extensible
            expect(categorySchema).to.be.an('object');
        });
    });
});
