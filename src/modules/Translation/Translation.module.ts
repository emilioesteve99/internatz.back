import { Module } from "@nestjs/common";
import { TranslationHttpController } from "@Translation/infrastructure/controller/TranslationHttp.controller";
import { TranslationsMigrateService } from "./application/TranslationsMigrate.service";

@Module({
	controllers: [TranslationHttpController],
	providers: [
		TranslationsMigrateService
	]
})
export class TranslationModule {};