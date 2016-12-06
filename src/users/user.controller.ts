import { UserRepository } from './user.repository';
import { IUserModel } from './user.model';
import { Log } from './../helpers/logger';
import * as express from "express";

const _userRepository: UserRepository = new UserRepository();

export class UserController {

    create(req: express.Request, res: express.Response): void {
        const user: IUserModel = <IUserModel>req.body;

        _userRepository.create(user)
            .then((user: IUserModel) => {
                res.send(user);
            })
            .catch(error => {
                Log.error(error);
                res.send(400, 'Something went wrong!');
            });
    }

    select(req: express.Request, res: express.Response): void {
        const id: string = req.query.id;

        res.send({
            id: id,
            username: 'linvi'
        });
    }
}