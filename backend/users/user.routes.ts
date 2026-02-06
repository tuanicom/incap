import express from 'express';
import { UserController } from './user.controller';
import UserProcess from './user.process';
import asyncHandler from 'express-async-handler';

export class UserRoutes {
    private readonly _router: express.Router;
    private readonly controller: UserController;

    constructor() {
        this._router = express.Router();
        this.controller = new UserController(UserProcess);
        this.declareRoutes();
    }

    public get router(): express.Router {
        return this._router;
    }

    public declareRoutes() {
        this.router.route('/').get(asyncHandler(async (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const users = await this.controller.getAll();
            res.json(users);
        }));
        this.router.route('/:id').get(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const user = await this.controller.getById(req.params.id as string);
            res.json(user);
        }));

        this.router.route('/').post(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const user = await this.controller.add(req.body);
            res.json(user);
        }));

        this.router.route('/').put(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const user = await this.controller.update(req.body);
            res.json(user);
        }));

        this.router.route('/:id').delete(asyncHandler(async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
            const user = await this.controller.delete(req.params.id as string);
            res.json(user);
        }));
    }
}
export default new UserRoutes().router;
