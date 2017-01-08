import { IAccountModel } from './../accounts/account.model';
import { Validators } from './../helpers/validators';
import { Auth } from './../auth/auth';
import * as Mongoose from "mongoose";
import * as bcrypt from 'bcrypt';

import { Database } from '../db';
import { AccountSchema } from './../accounts/account.schema';

const mongooseInstance = Database.mongooseInstance;
const mongooseConnection = Database.mongooseConnection;



const UserSchema: Mongoose.Schema = mongooseInstance.Schema(
    {
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

        if (!Validators.validateEmail(account.email)) {
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
    } else {
        next();
    }
});

export interface IMongoUser extends Mongoose.Document {
    name: string;
    account: IAccountModel;
}

export const UserSchemaModel = mongooseConnection.model<IMongoUser>("Users", UserSchema);