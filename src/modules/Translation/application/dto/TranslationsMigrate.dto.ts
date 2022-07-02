import { TranslationValueByKey } from '@Translation/domain/entity/Translation';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class TranslationsMigrateDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TranslationMigrateDto)
    translations: TranslationMigrateDto[];
    @IsString()
    apiKey: string;
}

export class TranslationMigrateDto {
    key: string;
    scope: string;
    value: TranslationValueByKey;
}
