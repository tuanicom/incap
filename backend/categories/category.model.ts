import { Schema, Document, model } from 'mongoose';

export interface ICategory extends Document {
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
const category = model<ICategory>('Category', categorySchema);
export default category;
