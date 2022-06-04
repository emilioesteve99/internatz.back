import { AuthModule } from '@Auth/Auth.module';
import { EnterpriseModule } from '@Enterprise/Enterprise.module';
import { Global, Module } from '@nestjs/common';
import { SharedModule } from '@Shared/Shared.module';

@Global()
@Module({
    imports: [SharedModule, AuthModule, EnterpriseModule],
    controllers: [],
    providers: [],
})
export class AppModule {};
