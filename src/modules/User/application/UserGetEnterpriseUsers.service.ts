import { Injectable } from '@nestjs/common';
import { RequestContext } from '@Shared/context/RequestContext';
import { UserMongoRepository } from '@User/infrastructure/persistence/mongo/UserMongo.repository';

@Injectable()
export class UserGetEnterpriseUsersService {
    constructor(private readonly userRepository: UserMongoRepository) {}

    /*@CacheResponse(() => {
		const { enterprise } = RequestContext.get();
		return `internatz:enterpriseUsers:${enterprise._id}`;
	}, 60)*/
    public async run() {
        const { enterprise } = RequestContext.get();
        return this.userRepository.getEnterpriseUsers(enterprise._id);
    }
}
