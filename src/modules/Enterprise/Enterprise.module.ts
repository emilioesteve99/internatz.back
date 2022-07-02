import { Global, Module } from '@nestjs/common';
import { EnterpriseGetService } from '@Enterprise/application/EnterpriseGet.service';
import { EnterpriseHttpController } from '@Enterprise/infrastructure/controller/EnterpriseHttp.controller';
import { EnterpriseMongoRepository } from '@Enterprise/infrastructure/persistence/mongo/EnterpriseMongo.repository';
import { EnterpriseGetByApiKeyService } from './application/EnterpriseGetByApiKey.service';

@Global()
@Module({
    controllers: [EnterpriseHttpController],
    providers: [
        EnterpriseGetService,
        EnterpriseMongoRepository,
        EnterpriseGetByApiKeyService,
    ],
    exports: [
        EnterpriseGetService,
        EnterpriseGetByApiKeyService,
    ],
})
export class EnterpriseModule { }
