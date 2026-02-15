import commentModel, { Comment } from './comment.model';

export class CommentProcess {

    public async getByArticle(articleId: string): Promise<Comment[]> {
        return commentModel.find({ articleId }).exec();
    }

    public async getById(id: string): Promise<Comment> {
        return commentModel.findById(id).exec().then(res => res as Comment);
    }

    public async save(newComment: Comment): Promise<Comment> {
        return newComment.save();
    }

    public async delete(id: string): Promise<Comment> {
        return commentModel.findOneAndDelete({ _id: id }).exec().then(res => res as Comment);
    }
}

export default new CommentProcess();
