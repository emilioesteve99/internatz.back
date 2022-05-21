import { Global, Module } from "@nestjs/common";
import { TranslationService } from "@Shared/translation/Translation.service";
import { RedisConfigurationType, RedisProvider } from "@Shared/cache/redis/Redis.provider";
import { ContextState } from "@Shared/context/ContextState";
import { getEnv } from "@Shared/environment/GetEnv";
import { SharedConstants } from "@Shared/Shared.constants";
import { CacheService } from "@Shared/cache/Cache.service";
import { RedisClientType } from "redis";
import { MongoProvider } from "./persistence/mongo/Mongo.provider";
import { MongoConfigurationType } from "./persistence/mongo/MongoConfiguration";

@Global()
@Module({
    providers: [
        {
            provide: SharedConstants.MONGO_CLIENT,
            useFactory: () => {
                const mongoEnv = getEnv<MongoConfigurationType>('mongo');
                mongoEnv.name = SharedConstants.MONGO_CLIENT;
                return MongoProvider(mongoEnv);
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