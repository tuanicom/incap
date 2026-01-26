import { Schema, Document, model } from 'mongoose';

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
const categoryModel = model<Category>('Category', categorySchema);
export default categoryModel;
