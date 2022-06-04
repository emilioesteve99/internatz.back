import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";
import { CompanyGetService } from "@Company/application/CompanyGet.service";
import { CompanyGetDto } from "@Company/application/CompanyGet.dto";
import { ApiTags } from "@nestjs/swagger";
import { EndpointPermissionGuard } from "@Shared/guard/EndpointPermission.guard";

@ApiTags('Company')
@Controller('company')
export class CompanyHttpController extends BaseHttpController {
	constructor (
		private readonly companyGetService: CompanyGetService
	) {
		super();
	}

	@UseGuards(EndpointPermissionGuard)
	@Get('getCompany')
	public async getCompany (@Query() dto: CompanyGetDto) {
		const company = await this.companyGetService.run(dto);
		return this.success({ company });
	}
}