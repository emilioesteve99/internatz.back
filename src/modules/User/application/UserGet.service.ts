import { Injectable } from "@nestjs/common";
import { UserMongoRepository } from "@User/infrastructure/persistence/mongo/UserMongo.repository";
import { UserGetDto } from "./dto/UserGet.dto";

@Injectable()
export class UserGetService {
	constructor (
		private readonly userRepository: UserMongoRepository
	) {}

	public async run (dto: UserGetDto) {
		return this.userRepository.getUser(dto._id);
	}
}