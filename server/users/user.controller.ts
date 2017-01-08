import { UserModelFactory } from './user.factory';
import { IMongoUser } from './user.schema';
import { UserRepository } from './user.repository';
import { Log } from './../helpers/logger';
import * as express from "express";

const _userRepository: UserRepository = new UserRepository();

export class UserController {

    create(req: express.Request, res: express.Response): void {
        const user: IMongoUser = <IMongoUser>req.body;

        _userRepository.create(user)
            .then((mongoUser: IMongoUser) => {
                const userModel = UserModelFactory.createFromMongo(mongoUser);
                res.send(userModel);
            })
            .catch(error => {
                Log.error(error);
                res.send(400, 'Something went wrong!');
            });
    }

    update(req: express.Request, res: express.Response): void {
        const userId: string = req.query.id;
        const userModel: IMongoUser = <IMongoUser>req.body;

        _userRepository.update(userId, userModel)
            .then((mongoUser: IMongoUser) => {
                const userModel = UserModelFactory.createFromMongo(mongoUser);
                res.send(200, userModel);
            })
            .catch(() => {
                res.send(400, 'Could not update user');
            });
    }

    delete(req: express.Request, res: express.Response) {
        const userId: string = req.query.id;
        _userRepository.delete(userId)
            .then(() => {
                res.send(200);
            })
            .catch(() => {
                res.send(404);
            });
    }


    select(req: express.Request, res: express.Response): void {
        const userId: string = req.query.id;

        _userRepository.findById(userId)
            .then((mongoUser: IMongoUser) => {
                const userModel = UserModelFactory.createFromMongo(mongoUser);
                res.send(userModel);
            })
            .catch(() => {
                res.send(404);
            });
    }
}