import { AuthMongoRepository } from "@Auth/infrastructure/persistence/mongo/AuthMongo.repository";
import { Injectable } from "@nestjs/common";
import { Enterprise } from "@Shared/entity/Enterprise";
import { User } from "@Shared/entity/User";
import { partialAssign } from "@Shared/utils/PartialAssign";
import { randomUUID } from "crypto";
import { AuthSignUpService } from "./AuthSignUp.service";
import { AuthRegisterEnterpriseDto } from "./dto/AuthRegisterEnterprise.dto";

@Injectable()
export class AuthRegisterEnterpriseService {
	constructor (
		private readonly authRepository: AuthMongoRepository,
		private readonly authSignUpService: AuthSignUpService
	) {}

	public async run (dto: AuthRegisterEnterpriseDto) {
		const enterpriseId = randomUUID();
		const userId = randomUUID();
		const enterprise = partialAssign(new Enterprise(), {
			_id: enterpriseId,
			name: dto.name,
			adminUserId: userId,
			apiKey: randomUUID(),
			dateAdd: new Date(),
		});
		await this.authRepository.registerEnterprise(enterprise);
		const user = partialAssign(new User(), {
			_id: userId,
			email: dto.email,
			password: dto.password,
			name: dto.name,
			enterpriseId,
			dateAdd: new Date(),
		});
		await this.authSignUpService.run(user, { isAdmin: true, userId });
		return enterprise;
	}
}