import Category, { ICategory } from "./category.model";

export interface ICategoryProcess {
    getAll(): Promise<ICategory[]>;
    getById(id: string): Promise<ICategory>;
    save(newCategory: ICategory): Promise<ICategory>;
    delete(id: string): Promise<ICategory>;
}

export class CategoryProcess implements ICategoryProcess {

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
        return Category.findOneAndDelete({ _id: id }).exec();
    }
}

export default new CategoryProcess() as ICategoryProcess;
