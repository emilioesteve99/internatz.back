import { Company } from "@Shared/entity/Company";
import { partialAssign } from "@Shared/utils/PartialAssign";

export class CompanyMongoMapper {
	public static map(companyDoc: any) {
		return partialAssign(new Company(), companyDoc);
	}
}