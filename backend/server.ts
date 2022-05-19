"use strict";

import * as express from "express";
import * as cors from "cors";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import CategoryRoutes from "./categories/category.routes";

/**
 * The server.
 *
 */
export class Server {

    public app: express.Application;
    private router: express.Router;

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

    /**
     * Bootstrap the application.
     *
     * @method bootstrap
     * @return Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    private config() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(morgan('combined'));
        this.app.use("/", this.router);
        this.app.listen(4000, () => console.log(`Express server running on port 4000`));
    }

    private dbConnection() {
        const mongoDbUrl = process.env.MONGO_DB_URL || "localhost:27017";
        mongoose.connect(`mongodb://${mongoDbUrl}/incap`);

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
