import { Module } from "@nestjs/common";
import { TranslationHttpController } from "@Translation/infrastructure/controller/TranslationHttp.controller";
import { TranslationsGetService } from "./application/TranslationsGet.service";
import { TranslationsMigrateService } from "./application/TranslationsMigrate.service";
import { TranslationMongoRepository } from "./infrastructure/persistence/mongo/TranslationMongo.repository";

@Module({
	controllers: [TranslationHttpController],
	providers: [
		TranslationsMigrateService,
		TranslationsGetService,
		TranslationMongoRepository,
	]
})
export class TranslationModule {};