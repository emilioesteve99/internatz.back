import { Controller, Get } from "@nestjs/common";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";
import { UserGetEnterpriseUsersService } from "@User/application/UserGetEnterpriseUsers.service";

@Controller('user')
export class UserHttpController extends BaseHttpController {
	constructor (
		private readonly userGetEnterpriseUsersService: UserGetEnterpriseUsersService,
	) {
		super();
	}

	@Get('getEnterpriseUsers')
	public async getEnterpriseUsers() {
		const users = await this.userGetEnterpriseUsersService.run();
		return this.success({ users });
	}
}