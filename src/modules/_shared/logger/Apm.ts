import * as apm from 'elastic-apm-node';
import { getEnv } from '../environment/GetEnv';

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
        environment: process.env.MODE
    })
}

export { apm };
