import * as mongoose from "mongoose";

export interface IUserModel extends mongoose.Document {
    name: string;
    password:string;
}

export class UserModel {

    private _userModel: IUserModel;

    constructor(userModel: IUserModel) {
        this._userModel = userModel;
    }
    
    get name (): string {
        return this._userModel.name;
    }

    get password(): string {
        return this._userModel.password;
    }
}