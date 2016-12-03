import { AuthenticationRequired, Auth } from './auth/auth';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { RestRoutes } from "./routes/routes";

var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;

export class RestServer {
    public static start(port?: number) {
        const app = express();

        app.use('/', RestRoutes);

        RestServer.initExpress(app);
        RestServer.initHeaders(app);
        RestServer.initBearerAuthentication();

        // Start Server
        if (port == null) { port = 3000; }
        app.listen(port, function () {
            console.log('Express server started on port ' + port + '!')
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

    private static initBearerAuthentication() {
        // Configure the Bearer strategy for use by Passport.
        //
        // The Bearer strategy requires a `verify` function which receives the
        // credentials (`token`) contained in the request.  The function must invoke
        // `cb` with a user object, which will be set at `req.user` in route handlers
        // after authentication.

        passport.use(new Strategy(function (token, cb) {
            process.nextTick(() => {
                const authPromise = Auth.verifyBearerToken(token);

                authPromise.then(function (data) {
                    cb(null, data);
                }).catch(function (error) {
                    cb(null, null);
                });
            });
        }));
    }
}