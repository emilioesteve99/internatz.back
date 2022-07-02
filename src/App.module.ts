import { AuthModule } from '@Auth/Auth.module';
import { EnterpriseModule } from '@Enterprise/Enterprise.module';
import { Global, Module } from '@nestjs/common';
import { SharedModule } from '@Shared/Shared.module';
import { TranslationModule } from '@Translation/Translation.module';
import { UserModule } from '@User/User.module';

@Global()
@Module({
    imports: [SharedModule, AuthModule, EnterpriseModule, TranslationModule, UserModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
