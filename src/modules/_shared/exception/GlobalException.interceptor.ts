import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { RequestContext } from "@Shared/context/RequestContext";
import { getEnv } from "@Shared/environment/GetEnv";
import { apm } from "@Shared/logger/Apm";
import { HttpResponse } from "@Shared/response/HttpResponse";
import { TranslationService } from "@Shared/translation/Translation.service";
import { convertEnvToBoolean } from "@Shared/utils/ConvertEnvToBoolean";
import { randomUUID } from "node:crypto";
import { BaseException } from "./Exception.base";

const errorLogPrint = getEnv<boolean>('errorLogPrint');

@Catch()
export class GlobalExceptionInterceptor implements ExceptionFilter {
    constructor(
        private readonly translationService: TranslationService
    ) { }

    catch(exception: BaseException, host: ArgumentsHost) {
        if (errorLogPrint) {
            console.log(exception);
        }
        const ctx = RequestContext.get();
        const httpContext = host.switchToHttp();
        const response = httpContext.getResponse();
        // TODO: ver como podría extraer la parte del contexto
        const status = exception['status'] ?? 500;
        let errorData;
        let fatalErrorData = null;
        if ((exception as any)?.custom) {
            const baseException = exception as BaseException;
            errorData = {
                id: randomUUID(),
                status,
                code: baseException.constructor.name,
                title: this.translationService.translate(baseException.title, {
                    locale: ctx.locale,
                    vars: baseException.detailArgs
                }),
                detail: this.translationService.translate(baseException.detail, {
                    locale: ctx.locale,
                    vars: baseException.detailArgs
                }),
                trace: this.prepareTrace(baseException.stack),
            };
        } else if (['BadRequestException', 'NotFoundException'].includes(exception.constructor.name)) {
            // Se trata de un error al pasar mal los parámetros, no hace falta traducirlo
            errorData = {
                id: randomUUID(),
                status,
                code: exception.constructor.name,
                title: Array.isArray((exception as any).response.message)
                    ? (exception as any).response.message.join(',\r\n')
                    : (exception as any).response.message,
                detail: Array.isArray((exception as any).response.message)
                    ? (exception as any).response.message.join(',\r\n')
                    : (exception as any).response.message,
                trace: this.prepareTrace(exception.stack),
            };
        } else {
            errorData = {
                id: randomUUID(),
                status,
                code: exception.constructor.name, // TODO: un ejemplo para ver que poner
                title: exception?.name,
                detail: 'Internal server error',
                trace: this.prepareTrace(exception.stack),
            };
            fatalErrorData = errorData;
            fatalErrorData.detail = exception.message;
        }
        // Send error to APM
        const error = fatalErrorData ? fatalErrorData : errorData;
        apm?.captureError(exception, {
            timestamp: exception['timestamp'] ?? Date.now(),
            custom: {
                error: {
                    ...error,
                },
            },
        });
        const body: HttpResponse = {
            errors: [errorData],
        };
        if (!ctx.debug || process.env.MODE !== 'development') errorData.trace = [];
        try {
            if (response.getHeaders()['content-type'] === 'text/html') {
                response.status(status).send(`<pre>${JSON.stringify(body, null, 2)}</pre>`);
            } else {
                response.status(status).send(JSON.stringify(body));
            }
        } catch (error) {
            if (response.getHeaders()['content-type'] === 'text/html') {
                response.end(`<pre>${JSON.stringify(body, null, 2)}</pre>`);
            } else {
                response.statusCode = status;
                response.end(JSON.stringify(body));
            }
        }
    }

    private prepareTrace(stackTrace: string): string[] {
        if (/ValidationPipe/.test(stackTrace)) {
            stackTrace = 'Error: Fallo al validar parámetros de la ruta\n' + stackTrace;
        }
        return stackTrace
            .replace(/\/code\//g, '')
            .replace(/    at /g, '')
            .split('\n')
            .filter((trace) => !/processTicksAndRejections/.test(trace))
            .filter((trace) => !/runMicrotasks/.test(trace))
            .filter((trace) => !/^[A-Z]:/.test(trace))
            .filter((trace) => !/Object.<anonymous>/.test(trace))
            .slice(1)
            .map((trace: string, i: number) => {
                return `${i + 1}# ` + trace.replace(/(\(.*)modules/, '(/modules').replace(/(\\)/g, '/');
            });
    }
}