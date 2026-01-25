import { Schema, Document, model } from 'mongoose';

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
const articleModel = model<Article>('Article', articleSchema);
export default articleModel;
