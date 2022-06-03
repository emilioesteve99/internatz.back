import { CompanyNotFoundException } from "@Company/domain/exception/CompanyNotFound.exception";
import { Inject, Injectable } from "@nestjs/common";
import { Company } from "@Shared/entity/Company";
import { MongoRepository } from "@Shared/persistence/mongo/Mongo.repository";
import { SharedConstants } from "@Shared/Shared.constants";
import { MongoClient } from "mongodb";
import { CompanyMongoMapper } from "./mapper/CompanyMongo.mapper";

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

	public async get(companyId: string): Promise<Company> {
		const companyDoc = await this.collection.findOne({ _id: companyId });
		if (!companyDoc) throw new CompanyNotFoundException(companyId);
		return CompanyMongoMapper.map(companyDoc);
	}
}