import { Database } from '../db';
import * as Mongoose from "mongoose";

var mongoose = Database.mongooseInstance;

export const AccountSchema: Mongoose.Schema = mongoose.Schema({
    password: { type: String, required: true },
    email: { type: String, required: true }
}, {
        strict: 'throw',
        useNestedStrict: true
    });