import { IMongoSessionModel } from './session.schema';
import * as Mongoose from "mongoose";

export interface ISessionModel {
    _id: string;
    accountId: string;
    createdDate: Date;
    revoked: boolean;
}

export class SessionModelFactory {
    static createFromMong(mongoSession: IMongoSessionModel): ISessionModel {
        return mongoSession;
    }
}

export class SessionModel implements ISessionModel {
    constructor(accountId: string) {
        this.accountId = accountId;
        this.revoked = false;
    }

    _id: string;
    accountId: string;
    createdDate: Date;
    revoked: boolean;
}