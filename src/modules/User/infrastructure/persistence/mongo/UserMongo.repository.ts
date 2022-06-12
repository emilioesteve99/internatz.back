import { UserNotFoundException } from "@Auth/domain/exception/UserNotFound.exception";
import { Inject, Injectable } from "@nestjs/common";
import { MongoRepository } from "@Shared/persistence/mongo/Mongo.repository";
import { SharedConstants } from "@Shared/Shared.constants";
import { MongoClient } from "mongodb";
import { UserMongoMapper } from "./mapper/UserMongo.mapper";

@Injectable()
export class UserMongoRepository extends MongoRepository {
	constructor (
		@Inject(SharedConstants.MONGO_CLIENT)
		protected readonly client: MongoClient,
	) {
		super({ database: 'internatz', collection: 'user' })
	}

	public async getUser(id: string) {
		const userDoc = await this.collection.findOne({ _id: id });
		if (!userDoc) throw new UserNotFoundException(id);
		return UserMongoMapper.map(userDoc);
	}
}