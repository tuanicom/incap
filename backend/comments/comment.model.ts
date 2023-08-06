import { Schema, Document, model } from 'mongoose';

export interface IComment extends Document {
    content: string;
    category: string;
    author: string;
}

export const commentSchema = new Schema({
    content: {
        type: String
    },
    article: {
        type: String
    },
    author: {
        type: String
    }
});
const comment = model<IComment>('Comment', commentSchema);
export default comment;
