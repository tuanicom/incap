"use strict";

import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import CategoryRoutes from "./categories/category.routes";

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
        this.dbConnection();
        this.routes();
        this.config();
    }

    private config() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use("/", this.router);
        this.app.listen(4000, () => console.log(`Express server running on port 4000`));
    }

    private dbConnection() {
        mongoose.connect("mongodb://mongodb:27017/incap", { useNewUrlParser: true });

        const connection = mongoose.connection;

        connection.once("open", () => {
            console.log("MongoDB database connection established successfully!");
        });
    }

    private routes() {
        this.router.use('/categories', CategoryRoutes);
    }
}

// start the server
Server.bootstrap();
