import { IsEmail, IsString } from "class-validator";

export class AuthRegisterCompanyDto {
	@IsString()
	name: string;

	@IsString()
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}