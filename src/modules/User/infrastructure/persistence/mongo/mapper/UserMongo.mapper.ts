import { User } from '@Shared/entity/User.entity';
import { partialAssign } from '@Shared/utils/PartialAssign';

export class UserMongoMapper {
    public static map(userDoc: any, deletePasword = true) {
        if (deletePasword) delete userDoc.password;
        return partialAssign(new User(), userDoc);
    }
}
