import { IsNotEmpty, IsString } from "class-validator";

export class CompanyGetDto {
	@IsString()
	@IsNotEmpty()
	companyId: string;
}