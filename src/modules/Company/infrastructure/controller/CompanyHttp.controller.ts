import { Controller } from "@nestjs/common";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";
import { CompanyGetService } from "@Company/application/CompanyGet.service";

@Controller('company')
export class CompanyHttpController extends BaseHttpController {
	constructor (
		private readonly companyGetService: CompanyGetService
	) {
		super();
	}
}