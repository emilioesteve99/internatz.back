import { Controller, Get, Query } from "@nestjs/common";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";
import { CompanyGetService } from "@Company/application/CompanyGet.service";
import { CompanyGetDto } from "@Company/application/CompanyGet.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Company')
@Controller('company')
export class CompanyHttpController extends BaseHttpController {
	constructor (
		private readonly companyGetService: CompanyGetService
	) {
		super();
	}

	@Get('getCompany')
	public async getCompany (@Query() dto: CompanyGetDto) {
		const company = await this.companyGetService.run(dto);
		return this.success({ company });
	}
}