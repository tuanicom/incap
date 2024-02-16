import article, { IArticle } from "./article.model";
import ArticleProcess from "./article.process";

export interface IArticleController {
    getAll(category?: string): Promise<IArticle[]>;
    getById(id: string): Promise<IArticle>;
    add(input: any): Promise<IArticle>;
    update(input: any): Promise<IArticle>;
    delete(id: string): Promise<IArticle>;
}

export class ArticleController implements IArticleController {

    public async getAll(category?: string): Promise<IArticle[]> {
        return ArticleProcess.getAll(category);
    }

    public async getById(id: string): Promise<IArticle> {
        return ArticleProcess.getById(id);
    }

    public async add(input: any): Promise<IArticle> {
        const newArticle = new article(input);
        return ArticleProcess.save(newArticle);
    }

    public async update(input: any): Promise<IArticle> {
        const articleToUpdate = await ArticleProcess.getById(input._id);
        articleToUpdate.title = input.title;
        articleToUpdate.content = input.content;
        return ArticleProcess.save(articleToUpdate);
    }

    public async delete(id: string): Promise<IArticle> {
        return ArticleProcess.delete(id);
    }
}

export default new ArticleController() as IArticleController;
