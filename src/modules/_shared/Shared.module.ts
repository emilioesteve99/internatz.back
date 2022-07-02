import { Global, MiddlewareConsumer, Module } from '@nestjs/common';
import { TranslationService } from '@Shared/translation/Translation.service';
import { RedisConfigurationType, RedisProvider } from '@Shared/cache/redis/Redis.provider';
import { ContextState } from '@Shared/context/ContextState';
import { getEnv } from '@Shared/environment/GetEnv';
import { SharedConstants } from '@Shared/Shared.constants';
import { CacheService } from '@Shared/cache/Cache.service';
import { RedisClientType } from 'redis';
import { MongoProvider } from '@Shared/persistence/mongo/Mongo.provider';
import { MongoConfigurationType } from '@Shared/persistence/mongo/MongoConfiguration';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionInterceptor } from '@Shared/exception/GlobalException.interceptor';
import { RequestContextMiddleware } from '@Shared/context/RequestContext.middleware';
import { IdentityGetSessionTokenContentService } from './identity/IdentityGetSessionTokenContent.service';
import { EndpointPermissionGuard } from './guard/EndpointPermission.guard';

@Global()
@Module({
    providers: [
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionInterceptor,
        },
        {
            provide: SharedConstants.MONGO_CLIENT,
            useFactory: () => {
                const mongoEnv = getEnv<MongoConfigurationType>('mongo');
                mongoEnv.name = SharedConstants.MONGO_CLIENT;
                return MongoProvider(mongoEnv);
            },
        },
        {
            provide: SharedConstants.REDIS_CLIENT,
            useFactory: () => {
                const redisEnv = getEnv<RedisConfigurationType>('redis');
                if (!redisEnv.active) return null;
                return RedisProvider(redisEnv);
            },
        },
        ContextState,
        {
            provide: TranslationService,
            useFactory: async () => {
                const translationService = new TranslationService();
                translationService.init();
                return translationService;
            },
        },
        {
            provide: CacheService,
            useFactory: (redisClient: RedisClientType) => {
                return new CacheService(redisClient);
            },
            inject: [SharedConstants.REDIS_CLIENT],
        },
        IdentityGetSessionTokenContentService,
        EndpointPermissionGuard,
    ],
    exports: [ContextState, TranslationService, CacheService, SharedConstants.MONGO_CLIENT, EndpointPermissionGuard],
})
export class SharedModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestContextMiddleware).forRoutes('*');
    }
}
