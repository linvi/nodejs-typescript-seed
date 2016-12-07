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

    update(req: express.Request, res: express.Response): void {
        const userId: string = req.query.id;
        const userModel: IUserModel = <IUserModel>req.body;

        _userRepository.update(userId, userModel)
            .then(newUser => {
                console.log('user exist!');
                res.send(200, newUser);
            })
            .catch(() => {
                res.send(400, 'Could not update user');
            });
    }

    delete(req: express.Request, res: express.Response) {
        const userId: string = req.query.id;
        _userRepository.delete(userId)
            .finally(() => {
                // more info as for why we return 200 : http://leedavis81.github.io/is-a-http-delete-requests-idempotent/
                res.send(200);
            });
    }


    select(req: express.Request, res: express.Response): void {
        const userId: string = req.query.id;

        _userRepository.findById(userId)
            .then(user => {
                res.send(user);
            })
            .catch(() => {
                console.log('SELECT ERROR!');
                res.send(404);
            });
    }
}