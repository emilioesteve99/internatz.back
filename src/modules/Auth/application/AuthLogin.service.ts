import { AuthMongoRepository } from "@Auth/infrastructure/persistence/mongo/AuthMongo.repository";
import { Injectable } from "@nestjs/common";
import { AuthLoginDto } from "./dto/AuthLogin.dto";

@Injectable()
export class AuthLoginService {
    constructor (
		private readonly authMongoRepository: AuthMongoRepository
	) {}

	public async run (dto: AuthLoginDto) {
		return this.authMongoRepository.login(dto.email, dto.password, dto.companyId);
	}
}