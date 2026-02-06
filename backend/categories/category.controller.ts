import categoryModel, { Category } from "./category.model";
import { CategoryProcess } from "./category.process";

export class CategoryController {
    constructor(private readonly process: CategoryProcess) {}

    public async getAll(): Promise<Category[]> {
        return this.process.getAll();
    }

    public async getById(id: string): Promise<Category> {
        return this.process.getById(id);
    }

    public async add(input: any): Promise<Category> {
        const newCategory = new categoryModel(input);
        return this.process.save(newCategory);
    }

    public async update(input: any): Promise<Category> {
        const categoryToUpdate = await this.process.getById(input._id);
        categoryToUpdate.title = input.title;
        categoryToUpdate.description = input.description;
        return this.process.save(categoryToUpdate);
    }

    public async delete(id: string): Promise<Category> {
        return this.process.delete(id);
    }
}
