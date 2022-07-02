import { logError } from '@Shared/logger/LogError';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { MongoConfigurationType } from './MongoConfiguration';

export async function MongoProvider(configuration: MongoConfigurationType): Promise<MongoClient> {
    const { name, url, pool } = configuration;
    let client = null;
    const poolNameString = name ? ` ${name} ` : ' ';
    try {
        client = new MongoClient(url, {
            maxPoolSize: pool.max,
            minPoolSize: pool.min,
            connectTimeoutMS: 10000,
            heartbeatFrequencyMS: 2500,
            minHeartbeatFrequencyMS: 2500,
            wtimeoutMS: 2500,
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverApi: ServerApiVersion.v1,
        } as any);
        await client.connect();
        console.log('\x1b[32m%s\x1b[0m', `Connection pool${poolNameString}(Mongodb) created`);
        client.on('serverHeartbeatFailed', () => {
            console.log('\x1b[31m%s\x1b[0m', `${`Connection ${poolNameString} (Mongodb) lost`}`);
        });
    } catch (error) {
        logError(error);
        console.log('\x1b[31m%s\x1b[0m', `Could not create${poolNameString}connection pool (Mongodb)`);
    }
    return client;
}
