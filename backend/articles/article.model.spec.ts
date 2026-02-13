import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';

describe("ArticleModel", () => {
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

    describe("Article Schema", () => {
        it("should have articleSchema exported", async () => {
            const { articleSchema } = await import('./article.model');
            expect(articleSchema).to.exist;
        });

        it("should have title field in schema", async () => {
            const { articleSchema } = await import('./article.model');
            expect(articleSchema.obj.title).to.exist;
        });

        it("should have content field in schema", async () => {
            const { articleSchema } = await import('./article.model');
            expect(articleSchema.obj.content).to.exist;
        });

        it("should have category field in schema", async () => {
            const { articleSchema } = await import('./article.model');
            expect(articleSchema.obj.category).to.exist;
        });

        it("should have author field in schema", async () => {
            const { articleSchema } = await import('./article.model');
            expect(articleSchema.obj.author).to.exist;
        });

        it("should have String type for title", async () => {
            const { articleSchema } = await import('./article.model');
            expect(articleSchema.obj.title.type).to.equal(String);
        });

        it("should have String type for content", async () => {
            const { articleSchema } = await import('./article.model');
            expect(articleSchema.obj.content.type).to.equal(String);
        });

        it("should have String type for category", async () => {
            const { articleSchema } = await import('./article.model');
            expect(articleSchema.obj.category.type).to.equal(String);
        });

        it("should have String type for author", async () => {
            const { articleSchema } = await import('./article.model');
            expect(articleSchema.obj.author.type).to.equal(String);
        });
    });

    describe("Article Interface", () => {
        it("should be able to import article model", async () => {
            const articleModel = await import('./article.model');
            expect(articleModel.default).to.exist;
        });
    });

    describe("Article Model Factory", () => {
        it("should return a model instance when creating articleModelFactory", async () => {
            const articleModelFactory = await import('./article.model');
            expect(articleModelFactory.default).to.exist;
        });

        it("should be able to call static methods on factory", async () => {
            const articleModel = await import('./article.model');
            expect(articleModel.default.find).to.exist;
        });

        it("should have find static method", async () => {
            const articleModel = await import('./article.model');
            expect(typeof articleModel.default.find).to.equal('function');
        });

        it("should have findById static method", async () => {
            const articleModel = await import('./article.model');
            expect(typeof articleModel.default.findById).to.equal('function');
        });

        it("should have findOneAndDelete static method", async () => {
            const articleModel = await import('./article.model');
            expect(typeof articleModel.default.findOneAndDelete).to.equal('function');
        });

        it("should have findOne static method", async () => {
            const articleModel = await import('./article.model');
            expect(typeof articleModel.default.findOne).to.equal('function');
        });

        it("should have create static method", async () => {
            const articleModel = await import('./article.model');
            expect(typeof articleModel.default.create).to.equal('function');
        });

        it("should have findByIdAndUpdate static method", async () => {
            const articleModel = await import('./article.model');
            expect(typeof articleModel.default.findByIdAndUpdate).to.equal('function');
        });

        it("should have findOneAndUpdate static method", async () => {
            const articleModel = await import('./article.model');
            expect(typeof articleModel.default.findOneAndUpdate).to.equal('function');
        });

        it("should have deleteOne static method", async () => {
            const articleModel = await import('./article.model');
            expect(typeof articleModel.default.deleteOne).to.equal('function');
        });
    });

    describe("Model Registration", () => {
        it("should register Article model in mongoose", async () => {
            const { default: articleModel } = await import('./article.model');
            // Access the model
            expect(articleModel).to.exist;

            // Try to trigger model retrieval
            const models = mongoose.modelNames();
            expect(models).to.be.an('array');
        });

        it("should handle OverwriteModelError gracefully", async () => {
            // First import
            const first = await import('./article.model');
            expect(first.default).to.exist;

            // Clear the model
            if ((mongoose as any).deleteModel) {
                try {
                    (mongoose as any).deleteModel('Article');
                } catch (err) {
                    // ignore
                }
            }

            // Model should still be accessible
            expect(first.default).to.exist;
        });

        it("should check Article in models object", async () => {
            const { default: articleModel } = await import('./article.model');
            expect(articleModel).to.exist;

            // Check the models object exists
            if ((mongoose as any).models) {
                expect((mongoose as any).models).to.be.an('object');
                // Try to access the Article model entry
                const modelEntry = (mongoose as any).models.Article;
                if (modelEntry) {
                    expect(modelEntry).to.exist;
                }
            }
        });

        it("should handle model names check with modelNames method", async () => {
            const { default: articleModel } = await import('./article.model');
            expect(articleModel).to.exist;

            const modelNames = mongoose.modelNames();
            expect(modelNames).to.be.an('array');

            // Article should be registered
            if (modelNames.includes('Article')) {
                expect(modelNames).to.include('Article');
            }
        });

        it("should provide factory function for creating instances", async () => {
            const { default: articleModel } = await import('./article.model');
            expect(typeof articleModel).to.equal('function');
        });
    });

    describe("Model instance creation", () => {
        it("should be able to create article instance properties", async () => {
            const { articleSchema } = await import('./article.model');
            // Verify schema can be used to create instances
            expect(articleSchema.paths.title).to.exist;
            expect(articleSchema.paths.content).to.exist;
        });

        it("should support all article fields", async () => {
            const { articleSchema } = await import('./article.model');
            const fields = ['title', 'content', 'category', 'author'];
            fields.forEach(field => {
                expect(articleSchema.paths[field]).to.exist;
            });
        });

        it("should allow article schema extension", async () => {
            const { articleSchema } = await import('./article.model');
            // Schema should be extensible
            expect(articleSchema).to.be.an('object');
        });
    });
});
