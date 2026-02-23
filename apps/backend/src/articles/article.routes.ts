import express from 'express';
import { ArticleController } from './article.controller';
import ArticleProcess from './article.process';
import asyncHandler from 'express-async-handler';

export class ArticleRoutes {
    private readonly _router: express.Router;
    private readonly controller: ArticleController;

    constructor() {
        this._router = express.Router();
        this.controller = new ArticleController(ArticleProcess);
        this.declareRoutes();
    }

    public get router(): express.Router {
        return this._router;
    }

    public declareRoutes() {
        this.router.route('/').get(asyncHandler(async (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const articles = await this.controller.getAll(_req.query.category as string);
            res.json(articles);
        }));
        this.router.route('/:id').get(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const article = await this.controller.getById(req.params.id as string);
            res.json(article);
        }));

        this.router.route('/').post(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const article = await this.controller.add(req.body);
            res.json(article);
        }));

        this.router.route('/').put(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const article = await this.controller.update(req.body);
            res.json(article);
        }));

        this.router.route('/:id').delete(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const article = await this.controller.delete(req.params.id as string);
            res.json(article);
        }));
    }
}
export default new ArticleRoutes().router;
