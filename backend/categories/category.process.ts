import category, { ICategory } from "./category.model";

export interface ICategoryProcess {
    getAll(): Promise<ICategory[]>;
    getById(id: string): Promise<ICategory>;
    save(newCategory: ICategory): Promise<ICategory>;
    delete(id: string): Promise<ICategory>;
}

export class CategoryProcess implements ICategoryProcess {

    public async getAll(): Promise<ICategory[]> {
        return category.find().exec();
    }

    public async getById(id: string): Promise<ICategory> {
        return category.findById(id).exec();
    }

    public async save(newCategory: ICategory): Promise<ICategory> {
        return newCategory.save();
    }

    public async delete(id: string): Promise<ICategory> {
        return category.findOneAndDelete({ _id: id }).exec().then(res => res.value);
    }
}

export default new CategoryProcess() as ICategoryProcess;
