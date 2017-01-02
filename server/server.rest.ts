import { Database } from './db';
import { Auth } from './auth/auth';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { RestRoutes } from "./routes";

// var auth = require("./auth.js")();
var jwt = require("jwt-simple");

export class RestServer {
    public static start(app: express.Express, port?: number, restRoutePrefix: string = '/') {
        Database.connect();
        Auth.initJWTAuthentication();

        RestServer.initExpress(app);
        RestServer.initHeaders(app);

        // IMPORTANT: Routes must be defined AFTER the initialization of the app
        // so that it can use the configured middleware!
        app.use(restRoutePrefix, RestRoutes);
        
        // Start Server
        if (port == null) { port = 3000; }

        app.listen(port, function () {
            console.log('REST SERVER started on port ' + port + '!')
        });
    }

    private static initExpress(app: express.Express) {
        app.use(require('morgan')('combined'));
        app.use(bodyParser.json());         // to support JSON-encoded bodies
        app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: false
        }));
    }

    private static initHeaders(app: express.Express) {
        app.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            res.setHeader('Access-Control-Allow-Credentials', 'true');

            // Pass to next layer of middleware
            next();
        });
    }
}