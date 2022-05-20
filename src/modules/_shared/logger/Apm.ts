import elasticApm, { Agent } from 'elastic-apm-node';
import { getEnv } from '../environment/GetEnv';

const apmEnv = getEnv<{
    active: boolean;
    serviceName: string;
    secretToken: string;
    serverUrl: string;
}>('apm');

var apm: Agent = null;
if (apmEnv.active) {
    apm = elasticApm.start({
        serviceName: apmEnv.serviceName,
        secretToken: apmEnv.secretToken,
        serverUrl: apmEnv.serverUrl,
    });
}

export { apm };
