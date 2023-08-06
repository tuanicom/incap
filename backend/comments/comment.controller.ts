import comment, { IComment } from "./comment.model";
import CommentProcess from "./comment.process";

export interface ICommentController {
    getAll(category?: string): Promise<IComment[]>;
    getById(id: string): Promise<IComment>;
    add(input: any): Promise<IComment>;
    update(input: any): Promise<IComment>;
    delete(id: string): Promise<IComment>;
}

export class CommentController implements ICommentController {

    public async getAll(category?: string): Promise<IComment[]> {
        return CommentProcess.getAll(category);
    }

    public async getById(id: string): Promise<IComment> {
        return CommentProcess.getById(id);
    }

    public async add(input: any): Promise<IComment> {
        const newComment = new comment(input);
        return CommentProcess.save(newComment);
    }

    public async update(input: any): Promise<IComment> {
        const commentToUpdate = await CommentProcess.getById(input._id);
        commentToUpdate.content = input.content;
        return CommentProcess.save(commentToUpdate);
    }

    public async delete(id: string): Promise<IComment> {
        return CommentProcess.delete(id);
    }
}

export default new CommentController() as ICommentController;
