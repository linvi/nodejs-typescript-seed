import { Auth } from './../auth/auth';
import * as Mongoose from "mongoose";
const bcrypt = require("bcrypt");

import { Database } from '../db';
import { IMongoUserModel } from "./user.model";
import { AccountSchema } from './../accounts/account.schema';


const mongoose = Database.mongooseInstance;
const mongooseConnection = Database.mongooseConnection;

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
        const password = account.password;

        if (account.email.indexOf('testme') == -1) {
            next(new Error('EMAIL'));
            return;
        }

        if (!user.isModified('account.password')) 
            return next();

        bcrypt.genSalt(Auth.SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(password, salt, function (err, hash) {
                if (err) return next(err);

                user.account.password = hash;
                next();
            });
        });
    }
});

export const UserSchemaModel = mongooseConnection.model<IMongoUserModel>("Users", UserSchema);