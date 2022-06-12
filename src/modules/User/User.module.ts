import { Global, Module } from "@nestjs/common";
import { UserHttpController } from "@User/infrastructure/controller/UserHttp.controller";
import { UserGetService } from "@User/application/UserGet.service";
import { UserMongoRepository } from "@User/infrastructure/persistence/mongo/UserMongo.repository";

@Global()
@Module({
	controllers: [UserHttpController],
	providers: [
		UserGetService,
		UserMongoRepository
	],
	exports: [
		UserGetService,
	]
})
export class UserModule {};