import { Injectable, NestMiddleware } from "@nestjs/common";
import { User } from "@Shared/entity/User";
import { IdentityGetSessionTokenContentService } from "@Shared/identity/IdentityGetSessionTokenContent.service";
import { apm } from "@Shared/logger/Apm";
import { partialAssign } from "@Shared/utils/PartialAssign";
import { randomUUID } from "crypto";
import { Request, Response } from 'express';
import { JwtPayload } from "jsonwebtoken";
import { RequestContext } from "./RequestContext";

@Injectable()
export class RequestContextMiddleware implements NestMiddleware<Request, Response> {
    constructor (
        private readonly identityGetSessionTokenSecret: IdentityGetSessionTokenContentService
    ) {}

    async use(req: Request, res: Response, next: (error?: any) => void) {
        RequestContext.start();
        const url = new URL(`http://${req.hostname}/${req.originalUrl}`);
        const params = url.searchParams;
        const requestId = apm?.currentTransaction?.ids['transaction.id'];
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const sessionToken = authHeader.replace('Bearer ', '');
            const payload = await this.identityGetSessionTokenSecret.run(sessionToken) as JwtPayload;
            const user = partialAssign(new User(), {
                _id: payload._id,
                enterpriseId: payload.enterpriseId,
                email: payload.email,
                isAdmin: payload.isAdmin,
                name: payload.name,
                permissions: payload.permissions
            });
            RequestContext.updateContext({ user, sessionToken });
        }
        RequestContext.updateContext({
            debug: params.has('debug'),
            requestId: requestId ?? randomUUID(),
        });
        const locale = 'es-ES'; // TODO: extraer de headers o cookie
        RequestContext.updateContext({ locale });
        next();
    }
}