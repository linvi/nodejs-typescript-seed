import { Database } from '../db';
import { IUserModel } from "./user.model";
import * as Mongoose from "mongoose";

var mongoose = Database.mongooseInstance;
var mongooseConnection = Database.mongooseConnection;

class UserSchemaModel {

    static get schema () {
        var schema =  mongoose.Schema({
            name : {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        });

        return schema;
    }
}

export const UserSchema = mongooseConnection.model<IUserModel>("Users", UserSchemaModel.schema);