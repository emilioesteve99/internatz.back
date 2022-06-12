import { Controller } from "@nestjs/common";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";

@Controller('user')
export class UserHttpController extends BaseHttpController {
	constructor () {
		super();
	}
}