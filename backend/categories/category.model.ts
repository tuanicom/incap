import { Schema, Document, model } from 'mongoose';

export interface ICategory extends Document {
    title: string;
    description: string;
}

export const CategorySchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
});
const Category = model<ICategory>('Category', CategorySchema);
export default Category;
