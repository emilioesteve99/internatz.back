import { EnterpriseNotFoundException } from "@Enterprise/domain/exception/EnterpriseNotFound.exception";
import { Inject, Injectable } from "@nestjs/common";
import { Enterprise } from "@Shared/entity/Enterprise";
import { MongoRepository } from "@Shared/persistence/mongo/Mongo.repository";
import { SharedConstants } from "@Shared/Shared.constants";
import { MongoClient } from "mongodb";
import { EnterpriseMongoMapper } from "./mapper/EnterpriseMongo.mapper";

@Injectable()
export class EnterpriseMongoRepository extends MongoRepository {
	constructor (
		@Inject(SharedConstants.MONGO_CLIENT)
		protected readonly client: MongoClient,
	) {
		super({
			database: 'internatz',
			collection: 'enterprise'
		})
	}

	public async get(enterpriseId: string): Promise<Enterprise> {
		const enterpriseDoc = await this.collection.findOne({ _id: enterpriseId });
		if (!enterpriseDoc) throw new EnterpriseNotFoundException(enterpriseId);
		return EnterpriseMongoMapper.map(enterpriseDoc);
	}
}