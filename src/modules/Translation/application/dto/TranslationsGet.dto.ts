import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class TranslationsGetDto {
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    scopes: string[];

    @IsString()
    apiKey: string;
}
