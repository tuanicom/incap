import comment, { IComment } from "./comment.model";

export interface ICommentProcess {
    getAll(category?: string): Promise<IComment[]>;
    getById(id: string): Promise<IComment>;
    save(newCategory: IComment): Promise<IComment>;
    delete(id: string): Promise<IComment>;
}

export class CommentProcess implements ICommentProcess {

    public async getAll(category?: string): Promise<IComment[]> {
        const criteria = category !== undefined ? {category: category} : {};
        return comment.find(criteria).exec();
    }

    public async getById(id: string): Promise<IComment> {
        return comment.findById(id).exec();
    }

    public async save(newComment: IComment): Promise<IComment> {
        return newComment.save();
    }

    public async delete(id: string): Promise<IComment> {
        return comment.findOneAndDelete({ _id: id }).exec();
    }
}

export default new CommentProcess() as ICommentProcess;
