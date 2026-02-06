import articleModel, { Article } from "./article.model";
import { ArticleProcess } from "./article.process";

export class ArticleController {
    constructor(private readonly process: ArticleProcess) {}

    public async getAll(category?: string): Promise<Article[]> {
        return this.process.getAll(category);
    }

    public async getById(id: string): Promise<Article> {
        return this.process.getById(id);
    }

    public async add(input: any): Promise<Article> {
        const newArticle = new articleModel(input);
        return this.process.save(newArticle);
    }

    public async update(input: any): Promise<Article> {
        const articleToUpdate = await this.process.getById(input._id);
        articleToUpdate.title = input.title;
        articleToUpdate.content = input.content;
        return this.process.save(articleToUpdate);
    }

    public async delete(id: string): Promise<Article> {
        return this.process.delete(id);
    }
}
