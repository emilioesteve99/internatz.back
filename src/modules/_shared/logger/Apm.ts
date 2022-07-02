import * as apm from 'elastic-apm-node';
import { getEnv } from '@Shared/environment/GetEnv';

const { active, serviceName, serverUrl, secretToken } = getEnv<{
    active: boolean;
    serviceName: string;
    secretToken: string;
    serverUrl: string;
}>('apm');

if (active) {
    apm.start({
        active,
        serviceName,
        serverUrl,
        secretToken,
        environment: process.env.MODE,
        logLevel: 'error',
    });
}

export { apm };
