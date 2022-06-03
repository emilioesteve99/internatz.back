import { Controller, Get, Query } from "@nestjs/common";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";
import { CompanyGetService } from "@Company/application/CompanyGet.service";
import { CompanyGetDto } from "@Company/application/CompanyGet.dto";

@Controller('company')
export class CompanyHttpController extends BaseHttpController {
	constructor (
		private readonly companyGetService: CompanyGetService
	) {
		super();
	}

	@Get('getCompany')
	public async getCompany (@Query() dto: CompanyGetDto) {
		//return this.companyGetService.run(dto);
	}
}