import commentModel, { Comment } from './comment.model';
import { CommentProcess } from './comment.process';

export class CommentController {
    constructor(private readonly process: CommentProcess) {}

    public async getByArticle(articleId: string): Promise<Comment[]> {
        return this.process.getByArticle(articleId);
    }

    public async getById(id: string): Promise<Comment> {
        return this.process.getById(id);
    }

    public async add(articleId: string, input: any): Promise<Comment> {
        const now = new Date().toISOString();
        const payload = Object.assign({}, input, { articleId: articleId, createdAt: now });
        const newComment = new commentModel(payload);
        return this.process.save(newComment);
    }

    public async update(input: any): Promise<Comment> {
        const commentToUpdate = await this.process.getById(input._id);
        commentToUpdate.text = input.text;
        commentToUpdate.updatedAt = new Date().toISOString();
        return this.process.save(commentToUpdate);
    }

    public async delete(id: string): Promise<Comment> {
        return this.process.delete(id);
    }
}

export default CommentController;
