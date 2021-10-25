import category, { ICategory } from "./category.model";
import CategoryProcess from "./category.process";

export interface ICategoryController {
    getAll(): Promise<ICategory[]>;
    getById(id: string): Promise<ICategory>;
    add(input: any): Promise<ICategory>;
    update(input: any): Promise<ICategory>;
    delete(id: string): Promise<ICategory>;
}

export class CategoryController implements ICategoryController {

    public async getAll(): Promise<ICategory[]> {
        return await CategoryProcess.getAll();
    }

    public async getById(id: string): Promise<ICategory> {
        return await CategoryProcess.getById(id);
    }

    public async add(input: any): Promise<ICategory> {
        const newCategory = new category(input);
        return await CategoryProcess.save(newCategory);
    }

    public async update(input: any): Promise<ICategory> {
        const categoryToUpdate = await CategoryProcess.getById(input._id);
        categoryToUpdate.title = input.title;
        categoryToUpdate.description = input.description;
        return await CategoryProcess.save(categoryToUpdate);
    }

    public async delete(id: string): Promise<ICategory> {
        return await CategoryProcess.delete(id);
    }
}

export default new CategoryController() as ICategoryController;
