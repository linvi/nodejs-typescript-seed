import * as Mongoose from "mongoose";
import { IMongoUserModel } from './user.schema';
import { AccountModel, IAccountModel } from './../accounts/account.model';

export interface IUserModel {
    _id: string;
    name: string;
    account: IAccountModel;
}

export class UserModelFactory {
    static createFromMongo(mongoUser: IMongoUserModel): IUserModel {
        return mongoUser;
    }
}

export class UserModel implements IUserModel {
    _id: string;
    name: string;
    account: IAccountModel;
}