import Category, { ICategory } from "./category.model";

export class CategoryProcess {

    public async getAll(): Promise<ICategory[]> {
        return await Category.find().exec();
    }

    public async getById(id: string): Promise<ICategory> {
        return await Category.findById(id).exec();
    }

    public async save(newCategory: ICategory): Promise<ICategory> {
        return await newCategory.save();
    }

    public async delete(id: string): Promise<ICategory> {
        return Category.findByIdAndRemove({ _id: id }).exec();
    }
}

export default new CategoryProcess();
