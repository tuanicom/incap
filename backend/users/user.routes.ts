import * as express from 'express';
import UserController from './user.controller';
import * as asyncHandler from 'express-async-handler';

export class UserRoutes {
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
            const users = await UserController.getAll();
            res.json(users);
        }));
        this.router.route('/:id').get(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const user = await UserController.getById(req.params.id as string);
            res.json(user);
        }));

        this.router.route('/').post(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const user = await UserController.add(req.body);
            res.json(user);
        }));

        this.router.route('/').put(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const user = await UserController.update(req.body);
            res.json(user);
        }));

        this.router.route('/:id').delete(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const user = await UserController.delete(req.params.id as string);
            res.json(user);
        }));
    }
}
export default new UserRoutes().router;
