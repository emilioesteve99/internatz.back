import { getEnv } from '@Shared/environment/GetEnv';
import { apm } from './Apm';

const errorLogPrint = getEnv<boolean>('errorLogPrint');

export function logError(error: Error | any) {
    if (errorLogPrint) {
        console.log(error);
    }
    apm?.captureError(error);
}
