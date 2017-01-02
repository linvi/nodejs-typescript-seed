import { IMongoUserModel } from './../users/user.model';
import { UserRepository } from './../users/user.repository';
var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JWTStrategy = passportJWT.Strategy;

const userRepostory = new UserRepository();

export class Auth {
    static AuthenticationRequired = passport.authenticate('jwt', { session: false });
    static get SECRET(): string {
        return "MyS3cr3tK3Y";
    }

    static SALT_WORK_FACTOR: number = 10;

    static initJWTAuthentication() {

        const config = {
            secretOrKey: Auth.SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeader()
        };

        const strategy = new JWTStrategy(config, function (payload, done) {
            const userId = payload.userId;
            userRepostory.findById(userId)
                .then((user: IMongoUserModel) => {
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(new Error("User not found"), null);
                    }
                })
                .catch(() => {
                    return done(new Error("User not found"), null);
                });
        });

        passport.use(strategy);
    }
}