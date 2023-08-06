import * as express from 'express';
import CommentController from './comment.controller';
import * as asyncHandler from 'express-async-handler';

export class CommentRoutes {
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
            const comments = await CommentController.getAll(_req.query.category as string);
            res.json(comments);
        }));
        this.router.route('/:id').get(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const comment = await CommentController.getById(req.params.id);
            res.json(comment);
        }));

        this.router.route('/').post(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const comment = await CommentController.add(req.body);
            res.json(comment);
        }));

        this.router.route('/').put(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const comment = await CommentController.update(req.body);
            res.json(comment);
        }));

        this.router.route('/:id').delete(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const comment = await CommentController.delete(req.params.id);
            res.json(comment);
        }));
    }
}
export default new CommentRoutes().router;
