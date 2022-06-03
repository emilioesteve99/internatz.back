import { AuthMongoRepository } from "@Auth/infrastructure/persistence/mongo/AuthMongo.repository";
import { Injectable } from "@nestjs/common";
import { AuthLoginDto } from "./dto/AuthLogin.dto";
import * as jwt from "jsonwebtoken";
import { getEnv } from "@Shared/environment/GetEnv";

@Injectable()
export class AuthLoginService {
	private readonly tokenSecret = getEnv<string>('tokenSecret');

    constructor (
		private readonly authMongoRepository: AuthMongoRepository
	) {}

	public async run (dto: AuthLoginDto) {
		const user = await this.authMongoRepository.login(
			dto.email,
			dto.password,
		);
		return jwt.sign(user.toPrimitive(), this.tokenSecret, {
			expiresIn: "23h"
		});
	}
}