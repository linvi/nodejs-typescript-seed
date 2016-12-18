import { Auth } from './auth';
import * as jwt from 'jsonwebtoken';
import * as express from "express";

import { UserRepository } from './../users/user.repository';

const users = new UserRepository();

export class AuthController {
    authenticate(req: express.Request, res: express.Response) {
        const username: string = req.body.username;
        const password: string = req.body.password;

        users.verifyUserCredentials(username, password)
            .then(user => {
                const payload = {
                    userId: user._id
                };

                const token = jwt.sign(payload, Auth.SECRET, {
                    expiresIn: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    token: token
                });
            })
            .catch(() => {
                res.sendStatus(401);
            });
    }

    verify(req: express.Request, res: express.Response) { 
        res.send(200);
    }
}