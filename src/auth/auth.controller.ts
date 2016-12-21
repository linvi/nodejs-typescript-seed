import { Auth } from './auth';
import * as jwt from 'jsonwebtoken';
import * as express from "express";

import { UserRepository } from './../users/user.repository';

const users = new UserRepository();

export class AuthController {
    // validatePassword(req: express.Request, res: express.Response) {
    //     const username = req.body.username;
    //     const password = req.body.password;
        

    //     bcrypt.compare(guess, "$2a$10$wupWvFa4njyD9S49PeceyeUsop0xoigorLBg59lMUO0AKOpZO9mwS", function (err, bres) {
    //         res.send(bres);
    //     });
    // }

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