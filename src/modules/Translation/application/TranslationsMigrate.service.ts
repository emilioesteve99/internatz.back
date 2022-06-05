import { Injectable } from "@nestjs/common";
import { partialAssign } from "@Shared/utils/PartialAssign";
import { Translation } from "@Translation/domain/entity/Translation";
import { randomUUID } from "crypto";
import { TranslationsMigrateDto } from "./dto/TranslationsMigrate.dto";

@Injectable()
export class TranslationsMigrateService {
	constructor () {}

	public async run (dto: TranslationsMigrateDto) {
		const translations = dto.translations.map(translation => {
			partialAssign(new Translation(), {
				_id: randomUUID(),
				key: translation.key,
				scope: translation.scope,
				value: translation.value,
				dateAdd: new Date()
			})
		});
		return true;
	}
}