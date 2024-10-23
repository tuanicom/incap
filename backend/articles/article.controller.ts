import articleModel, { Article } from "./article.model";
import ArticleProcess from "./article.process";

export class ArticleController {

    public async getAll(category?: string): Promise<Article[]> {
        return ArticleProcess.getAll(category);
    }

    public async getById(id: string): Promise<Article> {
        return ArticleProcess.getById(id);
    }

    public async add(input: any): Promise<Article> {
        const newArticle = new articleModel(input);
        return ArticleProcess.save(newArticle);
    }

    public async update(input: any): Promise<Article> {
        const articleToUpdate = await ArticleProcess.getById(input._id);
        articleToUpdate.title = input.title;
        articleToUpdate.content = input.content;
        return ArticleProcess.save(articleToUpdate);
    }

    public async delete(id: string): Promise<Article> {
        return ArticleProcess.delete(id);
    }
}

export default new ArticleController();
