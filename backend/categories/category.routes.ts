import * as express from 'express';
import CategoryController from './category.controller';
import * as asyncHandler from 'express-async-handler';

export class CategoryRoutes {
    private router: express.Router;

    get Router(): express.Router {
        return this.router;
    }

    constructor() {
        this.router = express.Router();
        this.declareRoutes();
    }

    public declareRoutes() {
        this.router.route('/').get(asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const categories = await CategoryController.getAll();
            res.json(categories);
        }));
        this.router.route('/:id').get(asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const category = await CategoryController.getById(req.params.id);
            res.json(category);
        }));

        this.router.route('/').post(asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const category = await CategoryController.add(req.body);
            res.json(category);
        }));

        this.router.route('/').put(asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const category = await CategoryController.update(req.body);
            res.json(category);
        }));

        this.router.route('/:id').delete(asyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const category = await CategoryController.delete(req.params.id);
            res.json(category);
        }));
    }
}
export default new CategoryRoutes().Router;
