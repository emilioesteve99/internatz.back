import { AuthModule } from '@Auth/Auth.module';
import { Global, Module } from '@nestjs/common';
import { SharedModule } from '@Shared/Shared.module';

@Global()
@Module({
    imports: [SharedModule, AuthModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
