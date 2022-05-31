import { Inject, Injectable } from "@nestjs/common";
import { Company } from "@Shared/entity/Company";
import { MongoRepository } from "@Shared/persistence/mongo/Mongo.repository";
import { SharedConstants } from "@Shared/Shared.constants";
import { MongoClient } from "mongodb";

@Injectable()
export class CompanyMongoRepository extends MongoRepository {
	constructor (
		@Inject(SharedConstants.MONGO_CLIENT)
		protected readonly client: MongoClient,
	) {
		super({
			database: 'internatz',
			collection: 'company'
		})
	}

	public async getAll(): Promise<Company[]> {
		return this.collection.find().toArray() as any;
	}
}