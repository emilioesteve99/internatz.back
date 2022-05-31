import { Global, Module } from "@nestjs/common";
import { CompanyGetService } from "@Company/application/CompanyGet.service";
import { CompanyHttpController } from "@Company/infrastructure/controller/CompanyHttp.controller";
import { CompanyMongoRepository } from "@Company/infrastructure/persistence/mongo/CompanyMongo.repository";
import { CacheService } from "@Shared/cache/Cache.service";

@Global()
@Module({
	controllers: [
		CompanyHttpController
	],
	providers: [
		{
			provide: CompanyGetService,
			useFactory: async (
				cacheService: CacheService,
				companyRepository: CompanyMongoRepository,
			) => {
				const companyGetService = new CompanyGetService(
					cacheService,
					companyRepository,
				);
				await companyGetService.init();
				return companyGetService;
			},
			inject: [CacheService, CompanyMongoRepository],
		},
		CompanyMongoRepository
	],
	exports: [
		CompanyGetService,
	]
})
export class CompanyModule {};