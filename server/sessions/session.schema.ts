import * as Mongoose from "mongoose";
import { Database } from '../db';

const mongoose = Database.mongooseInstance;
const mongooseConnection = Database.mongooseConnection;

const SessionSchema: Mongoose.Schema = mongoose.Schema(
    {
        accountId: { type: String, required: true },
        createdDate: { type: Date, required: true, default: Date.now },
        revoked: { type: Boolean, required: true }
    },
    {
        strict: 'throw',
    });

export interface IMongoSessionModel extends Mongoose.Document {
    accountId: string;
    createdDate: Date;
    revoked: boolean;
}

export const SessionSchemaModel = mongooseConnection.model<IMongoSessionModel>("Sessions", SessionSchema);