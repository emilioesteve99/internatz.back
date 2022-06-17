import { Injectable } from "@nestjs/common";
import { RequestContext } from "@Shared/context/RequestContext";
import { partialAssign } from "@Shared/utils/PartialAssign";
import { Translation } from "@Translation/domain/entity/Translation";
import { TranslationMongoRepository } from "@Translation/infrastructure/persistence/mongo/TranslationMongo.repository";
import { randomUUID } from "crypto";
import { TranslationsMigrateDto } from "./dto/TranslationsMigrate.dto";

@Injectable()
export class TranslationsMigrateService {
	constructor (
		private readonly translationRepository: TranslationMongoRepository,
	) {}

	public async run (dto: TranslationsMigrateDto) {
		const { enterprise } = RequestContext.get();
		const enterpriseId = enterprise._id;
		const translations = dto.translations.map(translation => {
			return partialAssign(new Translation(), {
				_id: randomUUID(),
				enterpriseId,
				key: translation.key,
				scope: translation.scope,
				value: translation.value,
				dateAdd: new Date()
			})
		});
		return this.translationRepository.bulkWrite(translations);
	}
}