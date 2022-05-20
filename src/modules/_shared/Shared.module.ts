import { Global, Module } from "@nestjs/common";
import { TranslationService } from "@Shared/translation/Translation.service";
import { ContextState } from "./context/ContextState";

@Global()
@Module({
    providers: [
        ContextState,
        {
            provide: TranslationService,
            useFactory: async () => {
                const translationService = new TranslationService();
                translationService.init();
                return translationService;
            }
        }
    ],
    exports: [TranslationService]
})
export class SharedModule {};