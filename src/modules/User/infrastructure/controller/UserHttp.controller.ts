import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";
import { EndpointPermissionGuard } from "@Shared/guard/EndpointPermission.guard";
import { UserSetPermissionsDto } from "@User/application/dto/UserSetPermissions.dto";
import { UserGetEnterpriseUsersService } from "@User/application/UserGetEnterpriseUsers.service";
import { UserSetPermissionsService } from "@User/application/UserSetPermissions.service";
import { UserGetEnterpriseUsersResponseDto } from "./dto/UserGetEnterpriseUsersResponse.dto";

@ApiTags('User')
@Controller('user')
export class UserHttpController extends BaseHttpController {
	constructor (
		private readonly userGetEnterpriseUsersService: UserGetEnterpriseUsersService,
		private readonly userSetPermissionsService: UserSetPermissionsService,
	) {
		super();
	}

	@ApiResponse({ status: 201, type: UserGetEnterpriseUsersResponseDto })
	@UseGuards(EndpointPermissionGuard)
	@Get('getEnterpriseUsers')
	public async getEnterpriseUsers() {
		const users = await this.userGetEnterpriseUsersService.run();
		return this.success({ users });
	}

	@UseGuards(EndpointPermissionGuard)
	@Post('setUserPermissions')
	public async setUserPermissions(@Body() dto: UserSetPermissionsDto) {
		const success = await this.userSetPermissionsService.run(dto);
		return this.success(success);
	}
}