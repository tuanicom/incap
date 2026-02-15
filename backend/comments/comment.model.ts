import mongoose, { Schema, Document, model, Model } from 'mongoose';

export interface Comment extends Document<string> {
    text: string;
    authorId: string;
    articleId: string;
    createdAt: string;
    updatedAt?: string;
}

export const commentSchema = new Schema({
    text: {
        type: String
    },
    authorId: {
        type: String
    },
    articleId: {
        type: String,
        index: true
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    }
});

function getCommentModel(): Model<Comment> {
    if ((mongoose as any).models && (mongoose as any).models.Comment) {
        return (mongoose as any).models.Comment as Model<Comment>;
    }
    if (mongoose.modelNames && mongoose.modelNames().includes && mongoose.modelNames().includes('Comment')) {
        return mongoose.model('Comment') as Model<Comment>;
    }
    try {
        return model<Comment>('Comment', commentSchema);
    } catch (err: any) {
        if (err && err.name === 'OverwriteModelError') {
            return (mongoose as any).models.Comment as Model<Comment>;
        }
        throw err;
    }
}

function commentModelFactory(this: any, ...args: any[]) {
    const M = getCommentModel();

    return new (M as any)(...args);
}

const staticMethods = ['find', 'findById', 'findOneAndDelete', 'findOne', 'create', 'findByIdAndUpdate', 'findOneAndUpdate', 'deleteOne'];
for (const name of staticMethods) {
    (commentModelFactory as any)[name] = (...args: any[]) => {
        const M = getCommentModel();
        return (M as any)[name](...args);
    };
}

export default (commentModelFactory as unknown) as Model<Comment>;
