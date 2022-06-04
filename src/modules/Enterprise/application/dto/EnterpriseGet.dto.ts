import { IsNotEmpty, IsString } from "class-validator";

export class EnterpriseGetDto {
	@IsString()
	@IsNotEmpty()
	enterpriseId: string;
}