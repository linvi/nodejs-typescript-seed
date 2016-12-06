import { UserRepository } from './user.repository';
import { IUserModel } from './user.model';
import { Log } from './../helpers/logger';
import * as express from "express";

const _userRepository: UserRepository = new UserRepository();

export class UserController {
    
    create(req: express.Request, res: express.Response): void {
        try {
            const user: IUserModel = <IUserModel>req.body;
            _userRepository.create(user, (error, result) => {
                if (error) {
                    res.send(400, error);
                } else {
                    res.send(200, result);
                }
            });

        } catch (e) {
            Log.error(e);
            res.send(400, 'The operation could not complete!');
        }
    }

    select(req: express.Request, res: express.Response): void {
        const id: string = req.query.id;

        res.send({
            id: id,
            username: 'linvi'
        });
    }
}