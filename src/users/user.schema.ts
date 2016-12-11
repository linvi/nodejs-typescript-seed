import * as Mongoose from "mongoose";
import { Database } from '../db';

import { IMongoUserModel } from "./user.model";
import { AccountSchema } from './../accounts/account.schema';


var mongoose = Database.mongooseInstance;
var mongooseConnection = Database.mongooseConnection;

const UserSchema: Mongoose.Schema = mongoose.Schema({
    name: { type: String, required: true },
    account: AccountSchema
}, {
        strict: 'throw',
        useNestedStrict: true
    });

UserSchema.pre('save', function (next) {
    const user = this;

    if (user.account != null) {
        const account = user.account;

        if (account.email.indexOf('testme') == -1) {
            next(new Error('EMAIL'));
            return;
        }
    }

    // if (user.account == null || user.account.password != null) {
    //     next();
    // } else {
    //     next(new Error('user.account is invalid.'));
    // }
    next();
});

export const UserSchemaModel = mongooseConnection.model<IMongoUserModel>("Users", UserSchema);