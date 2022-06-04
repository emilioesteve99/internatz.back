import { AuthModule } from '@Auth/Auth.module';
import { CompanyModule } from '@Company/Company.module';
import { Global, Module } from '@nestjs/common';
import { SharedModule } from '@Shared/Shared.module';

@Global()
@Module({
    imports: [SharedModule, AuthModule, CompanyModule],
    controllers: [],
    providers: [],
})
export class AppModule {};
