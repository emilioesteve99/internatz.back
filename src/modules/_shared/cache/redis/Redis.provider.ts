import { logError } from '@Shared/logger/LogError';
import { createClient, RedisClientType } from 'redis';

export type RedisConfigurationType = {
    url: string;
    username: string;
    password: string;
    database: number;
    active: boolean;
}

export async function RedisProvider (configuration: RedisConfigurationType): Promise<RedisClientType> {
    const { url, username, password, database } = configuration;
    let client: RedisClientType = null;
    try {
        const now = performance.now();
        client = createClient({
            url,
            username,
            password,
            database
        });
        await client.connect();
        console.log(
            '\x1b[32m%s\x1b[0m',
            `Connection (Redis) created + ${parseInt((performance.now() - now).toString())} ms`,
        );
    } catch (error) {
        logError(error);
        console.log('\x1b[31m%s\x1b[0m', `Could not create connection (Redis)`);
    }
    return client;
}