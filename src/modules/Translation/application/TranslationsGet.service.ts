import { Injectable } from '@nestjs/common';
import { RequestContext } from '@Shared/context/RequestContext';
import { TranslationMongoRepository } from '@Translation/infrastructure/persistence/mongo/TranslationMongo.repository';
import { TranslationsGetDto } from './dto/TranslationsGet.dto';

@Injectable()
export class TranslationsGetService {
    constructor(private readonly translationRepository: TranslationMongoRepository) {}

    public async run(dto: TranslationsGetDto) {
        const { enterprise } = RequestContext.get();
        return this.translationRepository.getTranslationsByScopes(dto.scopes, enterprise._id);
    }
}
