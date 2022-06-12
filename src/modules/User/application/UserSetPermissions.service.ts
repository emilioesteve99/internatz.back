import { Injectable } from "@nestjs/common";
import { UserMongoRepository } from "@User/infrastructure/persistence/mongo/UserMongo.repository";
import { UserSetPermissionsDto } from "./dto/UserSetPermissions.dto";

@Injectable()
export class UserSetPermissionsService {
	constructor (
		private readonly userRepository: UserMongoRepository
	) {}

	public async run (dto: UserSetPermissionsDto) {

	}
}