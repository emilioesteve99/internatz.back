import { IsString } from "class-validator";

export class CompanyGetDto {
	@IsString()
	companyId: string;
}