import { AuthModule } from '@Auth/Auth.module';
import { EnterpriseModule } from '@Enterprise/Enterprise.module';
import { Global, Module } from '@nestjs/common';
import { SharedModule } from '@Shared/Shared.module';
import { TranslationModule } from '@Translation/Translation.module';

@Global()
@Module({
    imports: [
        SharedModule,
        AuthModule,
        EnterpriseModule,
        TranslationModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {};
