import { apm } from '@Shared/logger/Apm';

process.on('unhandledRejection', (err) => {
    apm?.captureError(err as any);
    console.log(err);
});
process.on('uncaughtException', (err) => {
    apm?.captureError(err as any);
    console.log(err);
});
