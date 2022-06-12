import { Controller, Get } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";
import { UserGetEnterpriseUsersService } from "@User/application/UserGetEnterpriseUsers.service";
import { UserGetEnterpriseUsersResponseDto } from "./dto/UserGetEnterpriseUsersResponse.dto";

@ApiTags('User')
@Controller('user')
export class UserHttpController extends BaseHttpController {
	constructor (
		private readonly userGetEnterpriseUsersService: UserGetEnterpriseUsersService,
	) {
		super();
	}

	@ApiResponse({ status: 201, type: UserGetEnterpriseUsersResponseDto })
	@Get('getEnterpriseUsers')
	public async getEnterpriseUsers() {
		const users = await this.userGetEnterpriseUsersService.run();
		return this.success({ users });
	}
}