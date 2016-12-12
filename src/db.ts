import * as Mongoose from "mongoose";

export class DatabaseConfig {
    public static DB_CONNECTION_STRING: string = process.env.NODE_ENV === 'production' ? process.env.dbURI : "mongodb://localhost:27017/TestMe";
}

export class Database {
    private static _mongooseInstance: any;
    private static _mongooseConnection: Mongoose.Connection;

    static get mongooseInstance(): any {
        if (!this._mongooseInstance) {
            this.connect();
        }

        return this._mongooseInstance;
    }

    static get mongooseConnection(): Mongoose.Connection {
        if (!this._mongooseConnection) {
            this.connect();
        }

        return this._mongooseConnection;
    }

    static connect (): Mongoose.Connection {
        if(this._mongooseInstance) {
            return this._mongooseInstance;
        }

        this._mongooseConnection = Mongoose.connection;
        this._mongooseConnection.once("open", () => {
            console.log("Connected to mongodb.");
        });

        this._mongooseInstance = Mongoose.connect(DatabaseConfig.DB_CONNECTION_STRING);
        return this._mongooseConnection;
    }
}