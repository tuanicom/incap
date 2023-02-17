import { Schema, Document, model } from 'mongoose';

export interface IArticle extends Document {
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
const article = model<IArticle>('Article', articleSchema);
export default article;
