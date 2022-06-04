import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";
import { EnterpriseGetService } from "@Enterprise/application/EnterpriseGet.service";
import { EnterpriseGetDto } from "@Enterprise/application/dto/EnterpriseGet.dto";
import { ApiTags } from "@nestjs/swagger";
import { EndpointPermissionGuard } from "@Shared/guard/EndpointPermission.guard";

@ApiTags('Enterprise')
@Controller('enterprise')
export class EnterpriseHttpController extends BaseHttpController {
	constructor (
		private readonly enterpriseGetService: EnterpriseGetService
	) {
		super();
	}

	@UseGuards(EndpointPermissionGuard)
	@Get('getEnterprise')
	public async getEnterprise (@Query() dto: EnterpriseGetDto) {
		const enterprise = await this.enterpriseGetService.run(dto);
		return this.success({ enterprise });
	}
}