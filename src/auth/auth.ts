var passport = require('passport');

export const AuthenticationRequired = passport.authenticate('bearer', { session: false });

let i = 0;

export class Auth {
    public static verifyBearerToken(sessionId) {
        return new Promise((resolve, reject) => {
            if (i % 2 === 1) {
                resolve({});
            } else {
                reject();
            }

            ++i;
        });
    }

    public static AuthenticationRequired = AuthenticationRequired;
}