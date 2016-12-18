import { UserSchemaModel } from './user.schema';
import { IMongoUserModel } from "./user.model";
import { RepositoryBase } from "../common/base.repository";
import * as Promise from 'bluebird';

export class UserRepository extends RepositoryBase<IMongoUserModel> {
    constructor() {
        super(UserSchemaModel);
    }

    verifyUserCredentials(username: string, password: string): Promise<IMongoUserModel> {
        const promise = new Promise<IMongoUserModel>((resolve, reject) => {
            this._model.findOne({ "name": username, "account.password": password }, function (err, user: IMongoUserModel) {
                if (user) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });

        return promise;
    }
}