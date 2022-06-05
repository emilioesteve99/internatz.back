import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";
import { ApiKeyGuard } from "@Shared/guard/ApiKey.guard";
import { TranslationsMigrateDto } from "@Translation/application/dto/TranslationsMigrate.dto";
import { TranslationsMigrateService } from "@Translation/application/TranslationsMigrate.service";

@ApiTags('Translation')
@Controller('translation')
export class TranslationHttpController extends BaseHttpController {
	constructor (
		private readonly translationsMigrateService: TranslationsMigrateService
	) {
		super();
	}

	@UseGuards(ApiKeyGuard)
	@Post('migrateTranslations')
	public async migrateTranslations(@Body() dto: TranslationsMigrateDto) {
		const success = await this.translationsMigrateService.run(dto);
		return this.success(success);
	}
}