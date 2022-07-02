import { logError } from '@Shared/logger/LogError';

process.on('unhandledRejection', (err) => {
    logError(err);
});
process.on('uncaughtException', (err) => {
    logError(err);
});
