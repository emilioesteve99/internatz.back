import { AuthMongoRepository } from "@Auth/infrastructure/persistence/mongo/AuthMongo.repository";
import { Injectable } from "@nestjs/common";
import { User } from "@Shared/entity/User";
import { partialAssign } from "@Shared/utils/PartialAssign";
import { randomUUID } from "crypto";
import { AuthSignUpDto } from "./dto/AuthSignUp.dto";

@Injectable()
export class AuthSignUpService {
	constructor (
		private readonly authMongoRepository: AuthMongoRepository
	) {}

	public async run (dto: AuthSignUpDto, isAdmin?: boolean) {
		await this.authMongoRepository.checkIfUserJustExists(dto.email, dto.companyId);
		const user = partialAssign(new User(), {
			_id: randomUUID(),
			email: dto.email,
			password: dto.password,
			companyId: dto.companyId,
			name: dto.name,
			permissions: {
				'route': {},
				'endpoint': {},
			},
			isAdmin: isAdmin ?? false,
			dateAdd: new Date(),
		});
		await user.encriptPassword();
		await this.authMongoRepository.signUp(user);
		return user;
	}
}