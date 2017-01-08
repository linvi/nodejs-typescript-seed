import * as Mongoose from "mongoose";
import { AccountModel, IAccountModel } from './../accounts/account.model';

export interface IMongoUserModel extends Mongoose.Document {
    name: string;
    account: IAccountModel;
}

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