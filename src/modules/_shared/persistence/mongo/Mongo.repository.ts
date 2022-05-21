import { Db, MongoClient } from "mongodb";

export class MongoRepository {
    protected readonly client: MongoClient;

    constructor (
        private readonly configuration: MongoRepositoryConfigurationType
    ) {}

    protected get db(): Db {
        return this.client.db(this.configuration.database);
    }

    protected get collection() {
        return this.db.collection(this.configuration.collection);
    }
}

export type MongoRepositoryConfigurationType = {
    database: string;
    collection: string;
}