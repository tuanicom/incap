import categoryModel, { Category } from "./category.model";

export class CategoryProcess {

    public async getAll(): Promise<Category[]> {
        return categoryModel.find().exec();
    }

    public async getById(id: string): Promise<Category> {
        return categoryModel.findById(id).exec().then(res => res as Category);
    }

    public async save(newCategory: Category): Promise<Category> {
        return newCategory.save();
    }

    public async delete(id: string): Promise<Category> {
        return categoryModel.findOneAndDelete({ _id: id }).exec().then(res => res as Category);
    }
}

export default new CategoryProcess();
