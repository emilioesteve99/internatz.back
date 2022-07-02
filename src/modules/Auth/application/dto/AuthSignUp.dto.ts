import { IsString } from "class-validator";

export class AuthSignUpDto {
	@IsString()
	enterpriseId: string;
	@IsString()
	email: string;
	@IsString()
	password: string;
	@IsString()
	name: string;
}