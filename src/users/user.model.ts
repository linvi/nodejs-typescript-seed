import * as mongoose from "mongoose";
import { AccountModel, IAccountModel } from './../accounts/account.model';

export interface IMongoUserModel extends mongoose.Document {
    name: string;
    account: IAccountModel;
}

export interface IUserModel {
    name: string;
    account: IAccountModel;
}

export class UserModelFactory {
    static createFromMongo(mongoUser: IMongoUserModel): IUserModel {
        const user = new UserModel();
        user.name = mongoUser.name;

        if (mongoUser.account != null) {
            const mongoAccount = mongoUser.account;
            const account = new AccountModel();

            account.email = mongoAccount.email;
            account.password = mongoAccount.password
            user.account = account;
        }

        return user;
    }
}

export class UserModel implements IUserModel {
    name: string;
    account: IAccountModel;
}