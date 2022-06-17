import { IsArray, IsString, MinLength } from "class-validator";

export class TranslationsGetDto {
	@IsArray()
	@MinLength(1)
	@IsString({ each: true })
	scopes: string[];
}