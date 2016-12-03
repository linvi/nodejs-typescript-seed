import * as express from 'express';
import * as bodyParser from 'body-parser';
import { RestRoutes } from "./routes/routes";

export class RestServer {
    public static start(port?: number) {
        const app = express();

        app.use('/', RestRoutes);

        // Configure Express application.
        app.use(require('morgan')('combined'));
        app.use(bodyParser.json());         // to support JSON-encoded bodies
        app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
            extended: false
        }));

        // Add headers
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

        if (port == null) {
            port = 3000;
        }

        app.listen(port, function () {
            console.log('Express server started on port ' + port + '!')
        });
    }
}