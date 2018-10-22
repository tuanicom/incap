"use strict";

import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import Category, { ICategory } from "./models/category";

/**
 * The server.
 *
 */
export class Server {

    public app: express.Application;
    private router: express.Router;

    /**
     * Bootstrap the application.
     *
     * @method bootstrap
     * @return Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     */
    constructor() {
        // create expressjs application
        this.app = express();
        this.router = express.Router();
        this.config();
    }

    private config() {
        this.dbConnection();
        this.routes();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use("/", this.router);
        this.app.listen(4000, () => console.log(`Express server running on port 4000`));
    }

    private dbConnection() {
        mongoose.connect("mongodb://localhost/incap", { useNewUrlParser: true });

        const connection = mongoose.connection;

        connection.once("open", () => {
            console.log("MongoDB database connection established successfully!");
        });
    }

    private routes() {
        this.router.route('/categories').get((req, res) => {
            Category.find((err, categories) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(categories);
                }
            });
        });
        this.router.route('/categories/:id').get((req, res) => {
            Category.findById(req.params.id, (err, category) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(category);
                }
            });
        });

        this.router.route('/categories').post((req, res) => {
            const newCategory = new Category(req.body);
            newCategory.save()
                .then(category => {
                    res.status(200).json(category);
                })
                .catch(err => {
                    res.status(400).json(err);
                });
        });

        this.router.route('/categories').put((req, res) => {
            Category.findById(req.body._id, (err, category: ICategory) => {
                if (err) {
                    res.json(err);
                } else {
                    if (!category) {
                        return req.next(new Error('Could not load Document'));
                    } else {
                        category.title = req.body.title;
                        category.description = req.body.description;

                        category.save().then(updatedCategory => {
                            res.json(updatedCategory);
                        }).catch(err2 => {
                            res.status(400).json(err2);
                        });
                    }
                }
            });
        });

        this.router.route('/categories/:id').delete((req, res) => {
            Category.findByIdAndRemove({ _id: req.params.id }, (err, category) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json('Removed successfully' + category.title);
                }
            });
        });
    }
}

// start the server
Server.bootstrap();
