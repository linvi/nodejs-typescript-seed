var passport = require('passport');
let i = 0;

export class Auth {
    static verifyBearerToken(sessionId) {
        return new Promise((resolve, reject) => {
            if (i % 2 === 1) {
                resolve({});
            } else {
                reject();
            }

            ++i;
        });
    }

    static AuthenticationRequired = passport.authenticate('bearer', { session: false });
}