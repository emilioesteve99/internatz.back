import { Global, Module } from "@nestjs/common";
import { EnterpriseGetService } from "@Enterprise/application/EnterpriseGet.service";
import { EnterpriseHttpController } from "@Enterprise/infrastructure/controller/EnterpriseHttp.controller";
import { EnterpriseMongoRepository } from "@Enterprise/infrastructure/persistence/mongo/EnterpriseMongo.repository";

@Global()
@Module({
	controllers: [
		EnterpriseHttpController
	],
	providers: [
		EnterpriseGetService,
		EnterpriseMongoRepository
	],
	exports: [
		EnterpriseGetService,
	]
})
export class EnterpriseModule {};