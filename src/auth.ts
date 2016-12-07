var passport = require('passport');
var Strategy = require('passport-http-bearer').Strategy;

let i = 0;

export class Auth {
    static AuthenticationRequired = passport.authenticate('bearer', { session: false });

    static verifyBearerToken(sessionId: string) {
        return new Promise((resolve, reject) => {
            if (sessionId && sessionId.toLowerCase() == 'authenticated') {
                resolve({});
            } else {
                reject();
            }

            ++i;
        });
    }

    static initBearerAuthentication() {
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