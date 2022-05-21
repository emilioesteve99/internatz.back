import { Injectable } from "@nestjs/common";
import { CacheService } from "@Shared/cache/Cache.service";
import { User } from "@Shared/entity/User";
import { getEnv } from "@Shared/environment/GetEnv";
import { MongoRepository } from "@Shared/persistence/mongo/Mongo.repository";
import { partialAssign } from "@Shared/utils/PartialAssign";
import { MongoClient } from "mongodb";

@Injectable()
export class AuthMongoRepository extends MongoRepository {
    private users: UsersType = {};
    private usersCacheKey = 'internatz:users';

    constructor (
        protected readonly client: MongoClient,
        private readonly cacheService: CacheService,
    ) {
        super({
            collection: 'internatz',
            database: 'user'
        })
    }

    public async getUser (companyId: string, userId: string) {
        return this.users[companyId][userId];
    }

    public async init () {
        const usersReloadInterval = getEnv<number>('usersReloadInterval');
        await this.load();
        setInterval(() => {
            this.load();
        }, usersReloadInterval ?? 60000);
    }

    private async load () {
        const cachedUsers = await this.cacheService.get(this.usersCacheKey);
        if (cachedUsers) this.users = cachedUsers;
        const usersDocs = await this.collection.find({}).toArray();
        for (const doc of usersDocs) {
            const user = partialAssign(new User(), {
                id: doc._id as any,
                companyId: doc.companyId,
                email: doc.email,
                password: doc.password,
                name: doc.name,
                dateAdd: doc.dateAdd,
            });
            if (!this.users[user.companyId]) this.users[user.companyId] = {};
            this.users[user.companyId][user.id] = user;
        }
    }
}

type UsersType = {[companyId: string]: {[userId: string]: User}};