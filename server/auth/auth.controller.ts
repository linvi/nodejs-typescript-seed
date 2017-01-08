import { IMongoUser } from './../users/user.schema';
import { JWTToken } from './token.model';
import { SessionSchemaModel, IMongoSessionModel } from './../sessions/session.schema';
import { SessionModel } from './../sessions/session.model';
import { SessionRepository } from './../sessions/session.repository';
import { Auth } from './auth';
import * as jwt from 'jsonwebtoken';
import * as express from "express";

import { UserRepository } from './../users/user.repository';

const users = new UserRepository();
const sessions = new SessionRepository();

export class AuthController {
    authenticate(req: express.Request, res: express.Response) {
        const username: string = req.body.username;
        const password: string = req.body.password;

        users.verifyUserCredentials(username, password)
            .then((user: IMongoUser) => {
                var sessionModel = new SessionSchemaModel(new SessionModel(user._id));

                sessions.create(sessionModel)
                    .then((session) => {
                        const payload = new JWTToken({
                            sessionId: session._id,
                            accountId: user._id
                        });

                        const token = jwt.sign(payload, Auth.SECRET, {
                            expiresIn: '1y' // expires in 24 hours
                        });

                        // return the information including token as JSON
                        res.json({
                            success: true,
                            token: token
                        });
                    })
                    .catch(() => {
                        res.sendStatus(500)
                    });
            })
            .catch(() => {
                res.sendStatus(401);
            });
    }

    verify(req: express.Request, res: express.Response) {
        res.send(200);
    }

    invalidate(req: express.Request, res: express.Response) {
        const authenticatedUser = req.user;
        const authorization = req.headers['authorization'];
        const jsonWebToken = authorization.slice(4); // remove JWT at the start of the header

        const token: JWTToken = jwt.decode(jsonWebToken);

        sessions.findById(token.sessionId)
            .then((session: IMongoSessionModel) => {
                session.revoked = true;
                sessions.update(session._id, session)
                    .then(() => {
                        res.sendStatus(200)
                    })
                    .catch(() => {
                        res.sendStatus(500);
                    })
            })
            .catch(() => {
                res.sendStatus(404);
            });
    }
}