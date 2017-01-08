import { IUser, User } from '../../both/models/user';
import { IMongoUser } from './user.schema';

export class UserModelFactory {
    static createFromMongo(mongoUser: IMongoUser): IUser {
        const user = new User();
        user.id = mongoUser._id;
        user.name = mongoUser.name;
        return user;
    }
}