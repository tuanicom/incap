import * as express from 'express';
import ArticleController from './article.controller';
import * as asyncHandler from 'express-async-handler';

export class ArticleRoutes {
    private _router: express.Router;

    constructor() {
        this._router = express.Router();
        this.declareRoutes();
    }

    public get router(): express.Router {
        return this._router;
    }

    public declareRoutes() {
        this.router.route('/').get(asyncHandler(async (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const articles = await ArticleController.getAll(_req.query.category as string);
            res.json(articles);
        }));
        this.router.route('/:id').get(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const article = await ArticleController.getById(req.params.id as string);
            res.json(article);
        }));

        this.router.route('/').post(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const article = await ArticleController.add(req.body);
            res.json(article);
        }));

        this.router.route('/').put(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const article = await ArticleController.update(req.body);
            res.json(article);
        }));

        this.router.route('/:id').delete(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const article = await ArticleController.delete(req.params.id as string);
            res.json(article);
        }));
    }
}
export default new ArticleRoutes().router;
