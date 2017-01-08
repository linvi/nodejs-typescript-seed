import { Database } from '../db';
import * as Mongoose from "mongoose";

var mongooseInstance = Database.mongooseInstance;

export const AccountSchema: Mongoose.Schema = mongooseInstance.Schema(
    {
        password: { type: String, required: true },
        email: { type: String, required: true }
    }, 
    {
        _id: false,
        strict: 'throw',
        useNestedStrict: true
    });