import article, { IArticle } from "./article.model";

export interface IArticleProcess {
    getAll(category?: string): Promise<IArticle[]>;
    getById(id: string): Promise<IArticle>;
    save(newCategory: IArticle): Promise<IArticle>;
    delete(id: string): Promise<IArticle>;
}

export class ArticleProcess implements IArticleProcess {

    public async getAll(category?: string): Promise<IArticle[]> {
        const criteria = category !== undefined ? {category: category} : {};
        return article.find(criteria).exec();
    }

    public async getById(id: string): Promise<IArticle> {
        return article.findById(id).exec();
    }

    public async save(newCategory: IArticle): Promise<IArticle> {
        return newCategory.save();
    }

    public async delete(id: string): Promise<IArticle> {
        return article.findOneAndDelete({ _id: id }).exec();
    }
}

export default new ArticleProcess() as IArticleProcess;
