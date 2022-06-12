import { User } from "@Shared/entity/User";
import { partialAssign } from "@Shared/utils/PartialAssign";

export class UserMongoMapper {
	public static map(userDoc: any) {
		return partialAssign(new User(), userDoc);
	}
}