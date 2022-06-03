import { Global, Module } from "@nestjs/common";
import { CompanyGetService } from "@Company/application/CompanyGet.service";
import { CompanyHttpController } from "@Company/infrastructure/controller/CompanyHttp.controller";
import { CompanyMongoRepository } from "@Company/infrastructure/persistence/mongo/CompanyMongo.repository";

@Global()
@Module({
	controllers: [
		CompanyHttpController
	],
	providers: [
		CompanyGetService,
		CompanyMongoRepository
	],
	exports: [
		CompanyGetService,
	]
})
export class CompanyModule {};