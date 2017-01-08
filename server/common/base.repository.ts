import { UserModel } from './../users/user.model';
import * as Mongoose from 'mongoose';
import * as Promise from 'bluebird';

export class RepositoryBase<T extends Mongoose.Document> {

    protected _model: Mongoose.Model<Mongoose.Document>;

    constructor(schemaModel: Mongoose.Model<Mongoose.Document>) {
        this._model = schemaModel;
    }

    create(item: T): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
            this._model.create(item, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        return promise;
    }

    retrieve(): Promise<T[]> {
        const promise = new Promise<T[]>((resolve, reject) => {
            this._model.find({}, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        return promise;
    }

    update(_id: string, item: T): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
            this._model.update({ _id: _id }, item, (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        return promise;
    }

    delete(_id: string): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            this._model.remove({ _id: this.toObjectId(_id) }, (error: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(null);
                }
            });
        });

        return promise;
    }

    findById(_id: string): Promise<T> {
        const promise = new Promise<T>((resolve, reject) => {
            this._model.findById(_id, (error: any, result: any) => {
                if (error || result == null) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        return promise;
    }

    private toObjectId(_id: string): Mongoose.Types.ObjectId {
        return Mongoose.Types.ObjectId.createFromHexString(_id)
    }
}