import { partialAssign } from "@Shared/utils/PartialAssign";
import { Translation } from "@Translation/domain/entity/Translation";

export class TranslationMongoMapper {
	public static map (translationDoc) {
		return partialAssign(new Translation(), {
			_id: translationDoc._id,
			enterpriseId: translationDoc.enterpriseId,
			key: translationDoc.key,
			scope: translationDoc.scope,
			value: translationDoc.value,
			dateAdd: translationDoc.dateAdd,
		})
	}
}