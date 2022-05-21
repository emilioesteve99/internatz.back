import { Injectable, NestMiddleware } from "@nestjs/common";
import { apm } from "@Shared/logger/Apm";
import { randomUUID } from "crypto";
import { Request, Response } from 'express';
import { RequestContext } from "./RequestContext";

@Injectable()
export class RequestContextMiddleware implements NestMiddleware<Request, Response> {
    constructor () {}

    async use(req: Request, res: Response, next: (error?: any) => void) {
        RequestContext.start();
        const url = new URL(`http://${req.hostname}/${req.originalUrl}`);
        const params = url.searchParams;
        const requestId = apm?.currentTransaction?.ids['transaction.id'];
        RequestContext.updateCOntext({
            debug: params.has('debug'),
            requestId: requestId ?? randomUUID(),
        });
        const locale = 'es-ES'; // TODO: extraer de headers o cookie
        RequestContext.updateCOntext({ locale });
        next();
    }
}