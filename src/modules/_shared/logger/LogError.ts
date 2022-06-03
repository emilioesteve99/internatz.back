import { convertEnvToBoolean } from "@Shared/utils/ConvertEnvToBoolean";
import { apm } from "./Apm";


export function logError (error: Error | any) {
    if (convertEnvToBoolean(process.env.ERROR_LOG_PRINT)) {
        console.log(error);
    }
    apm?.captureError(error);
}