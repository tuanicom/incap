import mongoose, { Schema, Document, model, Model } from 'mongoose';

export interface Article extends Document<string> {
    title: string;
    content: string;
    category: string;
    author: string;
}

export const articleSchema = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    category: {
        type: String
    },
    author: {
        type: String
    }
});
function getArticleModel(): Model<Article> {
    if ((mongoose as any).models && (mongoose as any).models.Article) {
        return (mongoose as any).models.Article as Model<Article>;
    }
    if (mongoose.modelNames && mongoose.modelNames().includes && mongoose.modelNames().includes('Article')) {
        return mongoose.model('Article') as Model<Article>;
    }
    try {
        return model<Article>('Article', articleSchema);
    } catch (err: any) {
        if (err && err.name === 'OverwriteModelError') {
            return (mongoose as any).models.Article as Model<Article>;
        }
        throw err;
    }
}

function articleModelFactory(this: any, ...args: any[]) {
    const M = getArticleModel();

    return new (M as any)(...args);
}

const staticMethods = ['find', 'findById', 'findOneAndDelete', 'findOne', 'create', 'findByIdAndUpdate', 'findOneAndUpdate', 'deleteOne'];
for (const name of staticMethods) {
    // assign a function that delegates to the real model at call time
    (articleModelFactory as any)[name] = (...args: any[]) => {
        const M = getArticleModel();
        return (M as any)[name](...args);
    };
}

export default (articleModelFactory as unknown) as Model<Article>;
