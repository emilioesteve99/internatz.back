import { Enterprise } from "@Shared/entity/Enterprise";
import { partialAssign } from "@Shared/utils/PartialAssign";

export class EnterpriseMongoMapper {
	public static map(enterpriseDoc: any) {
		return partialAssign(new Enterprise(), enterpriseDoc);
	}
}