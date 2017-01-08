import { SessionSchemaModel, IMongoSessionModel } from './session.schema';
import { RepositoryBase } from "../common/base.repository";

export class SessionRepository extends RepositoryBase<IMongoSessionModel> {
    constructor() {
        super(SessionSchemaModel);
    }
}