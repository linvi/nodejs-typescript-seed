import { UserSchema } from './user.schema';
import { IUserModel } from "./user.model";
import { RepositoryBase } from "../common/base.repository";

export class UserRepository extends RepositoryBase<IUserModel> {
    constructor () {
        super(UserSchema);
    }
}