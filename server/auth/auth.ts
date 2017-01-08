import { IMongoUser } from './../users/user.schema';
import { IMongoSessionModel } from './../sessions/session.schema';
import { SessionRepository } from './../sessions/session.repository';
import { JWTToken } from './token.model';
import { UserRepository } from './../users/user.repository';

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JWTStrategy = passportJWT.Strategy;

const userRepostory = new UserRepository();
const sessionRepository = new SessionRepository();

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

        const strategy = new JWTStrategy(config, function (token: JWTToken, done) {
            sessionRepository.findById(token.sessionId)
                .then((session: IMongoSessionModel) => {
                    if (session && session.revoked) {
                        return done("Session has been revoked!", null);
                    }

                    userRepostory.findById(token.accountId)
                        .then((user: IMongoUser) => {
                            if (user) {
                                return done(null, user);
                            } else {
                                return done("User not found", null);
                            }
                        })
                        .catch(() => {
                            return done("User not found", null);
                        });
                })
                .catch(() => {
                    return done("Session not found", null);
                });;
        });

        passport.use(strategy);
    }
}