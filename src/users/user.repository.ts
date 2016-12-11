import { UserSchemaModel } from './user.schema';
import { IMongoUserModel } from "./user.model";
import { RepositoryBase } from "../common/base.repository";

export class UserRepository extends RepositoryBase<IMongoUserModel> {
    constructor () {
        super(UserSchemaModel);
    }
}