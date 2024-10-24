import articleModel, { Article } from "./article.model";

export class ArticleProcess {

    public async getAll(category?: string): Promise<Article[]> {
        const criteria = category !== undefined ? {category: category} : {};
        return articleModel.find(criteria).exec();
    }

    public async getById(id: string): Promise<Article> {
        return articleModel.findById(id).exec().then(res => res as Article);
    }

    public async save(newArticle: Article): Promise<Article> {
        return newArticle.save();
    }

    public async delete(id: string): Promise<Article> {
        return articleModel.findOneAndDelete({ _id: id }).exec().then(res => res as Article);
    }
}

export default new ArticleProcess();
