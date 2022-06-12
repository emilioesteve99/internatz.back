import { AuthMongoRepository } from "@Auth/infrastructure/persistence/mongo/AuthMongo.repository";
import { Injectable } from "@nestjs/common";
import { User } from "@Shared/entity/User.entity";
import { partialAssign } from "@Shared/utils/PartialAssign";
import { randomUUID } from "crypto";
import { AuthSignUpDto } from "./dto/AuthSignUp.dto";

@Injectable()
export class AuthSignUpService {
	constructor (
		private readonly authMongoRepository: AuthMongoRepository
	) {}

	public async run (dto: AuthSignUpDto, extraParams?: {
		userId?: string, isAdmin?: boolean
	}) {
		await this.authMongoRepository.checkIfUserJustExists(dto.email, dto.enterpriseId);
		const user = partialAssign(new User(), {
			_id: extraParams.userId ?? randomUUID(),
			email: dto.email,
			password: dto.password,
			enterpriseId: dto.enterpriseId,
			name: dto.name,
			permissions: {
				'route': {},
				'endpoint': {},
			},
			isAdmin: extraParams.isAdmin ?? false,
			dateAdd: new Date(),
		});
		await user.encriptPassword();
		await this.authMongoRepository.signUp(user);
		return user;
	}
}