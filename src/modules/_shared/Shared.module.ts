import { Global, Module } from "@nestjs/common";
import { TranslationService } from "@Shared/translation/Translation.service";
import { RedisConfigurationType, RedisProvider } from "@Shared/cache/redis/Redis.provider";
import { ContextState } from "@Shared/context/ContextState";
import { getEnv } from "@Shared/environment/GetEnv";
import { SharedConstants } from "@Shared/Shared.constants";
import { CacheService } from "@Shared/cache/Cache.service";
import { RedisClientType } from "redis";

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
        },
        {
            provide: SharedConstants.REDIS_CLIENT,
            useFactory: () => {
                const redisEnv = getEnv<RedisConfigurationType>('redis');
                if (!redisEnv.active) return null;
                return RedisProvider(redisEnv);
            },
        },
        {
            provide: CacheService,
            useFactory: (redisClient: RedisClientType) => {
                return new CacheService(redisClient);
            },
            inject: [SharedConstants.REDIS_CLIENT],
        },
    ],
    exports: [TranslationService, CacheService]
})
export class SharedModule {};