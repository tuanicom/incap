import * as express from 'express';
import CategoryController from './category.controller';
import * as asyncHandler from 'express-async-handler';

export class CategoryRoutes {
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
            const categories = await CategoryController.getAll();
            res.json(categories);
        }));
        this.router.route('/:id').get(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const category = await CategoryController.getById(req.params.id as string);
            res.json(category);
        }));

        this.router.route('/').post(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const category = await CategoryController.add(req.body);
            res.json(category);
        }));

        this.router.route('/').put(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const category = await CategoryController.update(req.body);
            res.json(category);
        }));

        this.router.route('/:id').delete(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const category = await CategoryController.delete(req.params.id as string);
            res.json(category);
        }));
    }
}
export default new CategoryRoutes().router;
