import mongoose, { Schema, Document, model, Model } from 'mongoose';

export interface Category extends Document<string> {
    title: string;
    description: string;
}

export const categorySchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
});
function getCategoryModel(): Model<Category> {
    if ((mongoose as any).models && (mongoose as any).models.Category) {
        return (mongoose as any).models.Category as Model<Category>;
    }
    if (mongoose.modelNames && mongoose.modelNames().includes && mongoose.modelNames().includes('Category')) {
    }
    try {
        return model<Category>('Category', categorySchema);
    } catch (err: any) {
        if (err && err.name === 'OverwriteModelError') {
            return (mongoose as any).models.Category as Model<Category>;
        }
        throw err;
    }
}

function categoryModelFactory(this: any, ...args: any[]) {
    const M = getCategoryModel();
    // construct a document instance

    return new (M as any)(...args);
}

const staticMethods = ['find', 'findById', 'findOneAndDelete', 'findOne', 'create', 'findByIdAndUpdate', 'findOneAndUpdate', 'deleteOne'];
for (const name of staticMethods) {
    (categoryModelFactory as any)[name] = (...args: any[]) => {
        const M = getCategoryModel();
        return (M as any)[name](...args);
    };
}

export default (categoryModelFactory as unknown) as Model<Category>;
