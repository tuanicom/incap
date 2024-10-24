import categoryModel, { Category } from "./category.model";
import CategoryProcess from "./category.process";

export class CategoryController {

    public async getAll(): Promise<Category[]> {
        return CategoryProcess.getAll();
    }

    public async getById(id: string): Promise<Category> {
        return CategoryProcess.getById(id);
    }

    public async add(input: any): Promise<Category> {
        const newCategory = new categoryModel(input);
        return CategoryProcess.save(newCategory);
    }

    public async update(input: any): Promise<Category> {
        const categoryToUpdate = await CategoryProcess.getById(input._id);
        categoryToUpdate.title = input.title;
        categoryToUpdate.description = input.description;
        return CategoryProcess.save(categoryToUpdate);
    }

    public async delete(id: string): Promise<Category> {
        return CategoryProcess.delete(id);
    }
}

export default new CategoryController();
