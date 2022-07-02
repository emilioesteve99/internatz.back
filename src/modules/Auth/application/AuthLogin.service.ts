import { AuthMongoRepository } from "@Auth/infrastructure/persistence/mongo/AuthMongo.repository";
import { Injectable } from "@nestjs/common";
import { AuthSignTokenService } from "./AuthSignToken.service";
import { AuthLoginDto } from "./dto/AuthLogin.dto";

@Injectable()
export class AuthLoginService {
	constructor(
		private readonly authMongoRepository: AuthMongoRepository,
		private readonly authSignTokenService: AuthSignTokenService,
	) { }

	public async run(dto: AuthLoginDto) {
		const user = await this.authMongoRepository.login(
			dto.email,
			dto.password,
		);
		return this.authSignTokenService.run(user);
	}
}