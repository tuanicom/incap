import express from 'express';
import { CategoryController } from './category.controller';
import CategoryProcess from './category.process';
import asyncHandler from 'express-async-handler';

export class CategoryRoutes {
    private readonly _router: express.Router;
    private readonly controller: CategoryController;

    constructor() {
        this._router = express.Router();
        this.controller = new CategoryController(CategoryProcess);
        this.declareRoutes();
    }

    public get router(): express.Router {
        return this._router;
    }

    public declareRoutes() {
        this.router.route('/').get(asyncHandler(async (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const categories = await this.controller.getAll();
            res.json(categories);
        }));
        this.router.route('/:id').get(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const category = await this.controller.getById(req.params.id as string);
            res.json(category);
        }));

        this.router.route('/').post(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const category = await this.controller.add(req.body);
            res.json(category);
        }));

        this.router.route('/').put(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const category = await this.controller.update(req.body);
            res.json(category);
        }));

        this.router.route('/:id').delete(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const category = await this.controller.delete(req.params.id as string);
            res.json(category);
        }));
    }
}
export default new CategoryRoutes().router;
