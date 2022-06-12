import { Global, Module } from "@nestjs/common";
import { UserHttpController } from "@User/infrastructure/controller/UserHttp.controller";
import { UserGetService } from "@User/application/UserGet.service";
import { UserMongoRepository } from "@User/infrastructure/persistence/mongo/UserMongo.repository";
import { UserGetEnterpriseUsersService } from "@User/application/UserGetEnterpriseUsers.service";

@Global()
@Module({
	controllers: [UserHttpController],
	providers: [
		UserGetService,
		UserMongoRepository,
		UserGetEnterpriseUsersService
	],
	exports: [
		UserGetService,
	]
})
export class UserModule {};