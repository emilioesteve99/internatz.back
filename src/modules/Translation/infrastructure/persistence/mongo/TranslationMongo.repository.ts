import { Inject, Injectable } from "@nestjs/common";
import { MongoRepository } from "@Shared/persistence/mongo/Mongo.repository";
import { SharedConstants } from "@Shared/Shared.constants";
import { Translation } from "@Translation/domain/entity/Translation";
import { MongoClient } from "mongodb";
import { TranslationMongoMapper } from "./mapper/TranslationMongo.mapper";

@Injectable()
export class TranslationMongoRepository extends MongoRepository {
	constructor (
		@Inject(SharedConstants.MONGO_CLIENT)
		protected readonly client: MongoClient
	) {
		super({ database: 'internatz', collection: 'translation' })
	}

	public async bulkWrite(translations: Translation[]) {
		return true;
	}

	public async getTranslationsByScopes(scopes: string[], enterpriseId: string) {
		const translations = await this.collection.find({ enterpriseId, scope: {
			$in: scopes,
		}})
		return translations.map(translationDoc => {
			const translation = TranslationMongoMapper.map(translationDoc);
			delete translation._id;
			delete translation.enterpriseId;
			return translation;
		})
	}
}