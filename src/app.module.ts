import { Global, Module } from '@nestjs/common';
import { SharedModule } from '@Shared/Shared.module';

@Global()
@Module({
    imports: [SharedModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
