import express from 'express';
import asyncHandler from 'express-async-handler';
import { CommentController } from './comment.controller';
import CommentProcess from './comment.process';

export class CommentRoutes {
    private readonly _router: express.Router;
    private readonly controller: CommentController;

    constructor() {
        this._router = express.Router();
        this.controller = new CommentController(CommentProcess);
        this.declareRoutes();
    }

    public get router(): express.Router {
        return this._router;
    }

    public declareRoutes() {
        // List and create comments for an article
        this.router.route('/articles/:articleId/comments').get(asyncHandler(async (req: express.Request, res: express.Response) => {
            const comments = await this.controller.getByArticle(req.params.articleId as string);
            res.json(comments);
        }));

        this.router.route('/articles/:articleId/comments').post(asyncHandler(async (req: express.Request, res: express.Response) => {
            const comment = await this.controller.add(req.params.articleId as string, req.body);
            res.status(201).json(comment);
        }));

        // Update and delete by comment id
        this.router.route('/comments/:id').put(asyncHandler(async (req: express.Request, res: express.Response) => {
            // Ensure body contains _id
            req.body._id = req.params.id;
            const comment = await this.controller.update(req.body);
            res.json(comment);
        }));

        this.router.route('/comments/:id').delete(asyncHandler(async (req: express.Request, res: express.Response) => {
            await this.controller.delete(req.params.id as string);
            res.status(204).end();
        }));
    }
}

export default new CommentRoutes().router;
