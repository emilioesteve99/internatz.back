import { Inject, Injectable } from '@nestjs/common';
import { MongoRepository } from '@Shared/persistence/mongo/Mongo.repository';
import { SharedConstants } from '@Shared/Shared.constants';
import { Translation } from '@Translation/domain/entity/Translation';
import { MongoClient } from 'mongodb';
import { TranslationMongoMapper } from './mapper/TranslationMongo.mapper';

@Injectable()
export class TranslationMongoRepository extends MongoRepository {
    constructor(
        @Inject(SharedConstants.MONGO_CLIENT)
        protected readonly client: MongoClient,
    ) {
        super({ database: 'internatz', collection: 'translation' });
    }

    public async bulkWrite(translations: Translation[]) {
        var bulk = this.collection.initializeUnorderedBulkOp();
        for (let doc of translations) {
            bulk.find({ key: doc.key, scope: doc.scope }).upsert().replaceOne(doc);
        }
        const { ok } = await bulk.execute();
        return ok >= 1;
    }

    public async getTranslationsByScopes(scopes: string[], enterpriseId: string) {
        const translations = await this.collection
            .find({
                enterpriseId,
                scope: {
                    $in: scopes,
                },
            })
            .toArray();
        return translations.map((translationDoc) => {
            const translation = TranslationMongoMapper.map(translationDoc);
            delete translation._id;
            delete translation.enterpriseId;
            return translation;
        });
    }
}
