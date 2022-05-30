import { CouldNotSignUpUserException } from "@Auth/domain/exception/CouldNotSignUpUser.exception";
import { UserJustExistsException } from "@Auth/domain/exception/UserJustExists.exception";
import { WrongUserOrPasswordException } from "@Auth/domain/exception/WrongUserOrPassword.exception";
import { Inject, Injectable } from "@nestjs/common";
import { CacheService } from "@Shared/cache/Cache.service";
import { User } from "@Shared/entity/User";
import { MongoRepository } from "@Shared/persistence/mongo/Mongo.repository";
import { SharedConstants } from "@Shared/Shared.constants";
import { partialAssign } from "@Shared/utils/PartialAssign";
import { MongoClient } from "mongodb";

@Injectable()
export class AuthMongoRepository extends MongoRepository {
    constructor (
        @Inject(SharedConstants.MONGO_CLIENT)
        protected readonly client: MongoClient,
        private readonly cacheService: CacheService,
    ) {
        super({
            collection: 'internatz',
            database: 'user'
        })
    }

    public async signUp (user: User) {
        const { acknowledged } = await this.collection.insertOne(user as any);
        if (!acknowledged) throw new CouldNotSignUpUserException();
        return user;
    }

    public async login (email: string, password: string, companyId: string) {
        const exception = new WrongUserOrPasswordException();
        const userDoc = await this.collection.findOne({ email, companyId });
        if (!userDoc) throw exception;
        const user = partialAssign(new User(), {
            _id: userDoc._id as any,
            email: userDoc.email,
            companyId: userDoc.companyId,
            name: userDoc.name,
            password: userDoc.password,
            dateAdd: userDoc.dateAdd
        });
        if (!user.isValidPassword(password)) throw exception;
        return user;
    }

    public async checkIfUserJustExists (email: string, companyId: string) {
        const counter = await this.collection.count({ email, companyId });
        if (counter >= 1) throw new UserJustExistsException(email, companyId);
    }
}