import { Injectable } from '@nestjs/common';
import { getEnv } from '@Shared/environment/GetEnv';
import { RedisClientType } from 'redis';

@Injectable()
export class CacheService {
    private defaultSeconds: number = getEnv('redisDefaultSeconds') ?? 60;
    constructor(private readonly redisClient: RedisClientType) {}

    public async getMany(keys: string[]): Promise<any[]> {
        const results = await this.redisClient?.mGet(keys);
        if (!results) return undefined;
        return results.map((result) => this.processResult(result));
    }

    public async getKeys(pattern: string): Promise<string[]> {
        return this.redisClient?.keys(pattern);
    }

    public async get(key: string): Promise<any> {
        const result = await this.redisClient?.get(key);
        if (!result) return undefined;
        return this.processResult(result);
    }

    private processResult(result: any) {
        if (result?.[0] == '{') return JSON.parse(result);
        else if (result?.[0] == '[') return JSON.parse(result);
        return result;
    }

    public async set(key: string, value: any, seconds: number = this.defaultSeconds) {
        if (this.redisClient) {
            if (typeof value == 'object' && value) value = JSON.stringify(value);
            await this.redisClient.set(key, value, {
                EX: seconds,
            });
        }
    }

    public async removeMany(keys: string[]): Promise<void> {
        await this.redisClient?.del(keys);
    }
}
