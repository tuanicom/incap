import Category, { ICategory } from "./category.model";
import CategoryProcess from "./category.process";

export class CategoryController {

    public async getAll(): Promise<ICategory[]> {
        return await CategoryProcess.getAll();
    }

    public async getById(id: string): Promise<ICategory> {
        return await CategoryProcess.getById(id);
    }

    public async add(input: any): Promise<ICategory> {
        const newCategory = new Category(input);
        return await CategoryProcess.save(newCategory);
    }

    public async update(input: any): Promise<ICategory> {
        const category = await CategoryProcess.getById(input._id);
        category.title = input.title;
        category.description = input.description;
        return await CategoryProcess.save(category);
    }

    public async delete(id: string): Promise<ICategory> {
        return await CategoryProcess.delete(id);
    }
}

export default new CategoryController();
