import { AuthMongoRepository } from "@Auth/infrastructure/persistence/mongo/AuthMongo.repository";
import { Injectable } from "@nestjs/common";
import { Company } from "@Shared/entity/Company";
import { User } from "@Shared/entity/User";
import { partialAssign } from "@Shared/utils/PartialAssign";
import { randomUUID } from "crypto";
import { AuthSignUpService } from "./AuthSignUp.service";
import { AuthRegisterCompanyDto } from "./dto/AuthRegisterCompany.dto";

@Injectable()
export class AuthRegisterCompanyService {
	constructor (
		private readonly authRepository: AuthMongoRepository,
		private readonly authSignUpService: AuthSignUpService
	) {}

	public async run (dto: AuthRegisterCompanyDto) {
		const companyId = randomUUID();
		const userId = randomUUID();
		const company = partialAssign(new Company(), {
			_id: randomUUID(),
			name: dto.name,
			adminUserId: userId,
			apiKey: randomUUID(),
			dateAdd: new Date(),
		});
		await this.authRepository.registerCompany(company);
		const user = partialAssign(new User(), {
			_id: userId,
			email: dto.email,
			password: dto.password,
			name: dto.name,
			companyId,
			dateAdd: new Date(),
		});
		await this.authSignUpService.run(user, true);
		return company;
	}
}