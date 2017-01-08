import { UserSchemaModel, IMongoUser } from './user.schema';
import { RepositoryBase } from "../common/base.repository";

import * as Promise from 'bluebird';
import * as bcrypt from 'bcrypt';

export class UserRepository extends RepositoryBase<IMongoUser> {
    constructor() {
        super(UserSchemaModel);
    }

    verifyUserCredentials(username: string, password: string): Promise<any> {
        const promise = new Promise<any>((resolve, reject) => {
            this._model.findOne({ "name": username }, function (err, user: IMongoUser) {
                if (user && user.account) {
                    bcrypt.compare(password, user.account.password, function (err, success: boolean) {
                        if (!err && success) {
                            resolve(user);
                        } else {
                            reject(err);
                        }
                    });
                } else {
                    reject();
                }
            });
        });

        return promise;
    }
}