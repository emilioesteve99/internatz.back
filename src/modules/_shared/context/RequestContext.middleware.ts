import { EnterpriseGetService } from '@Enterprise/application/EnterpriseGet.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { IdentityGetSessionTokenContentService } from '@Shared/identity/IdentityGetSessionTokenContent.service';
import { apm } from '@Shared/logger/Apm';
import { UserGetService } from '@User/application/UserGet.service';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { RequestContext } from './RequestContext';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware<Request, Response> {
    constructor(
        private readonly identityGetSessionTokenSecret: IdentityGetSessionTokenContentService,
        private readonly enterpriseGetService: EnterpriseGetService,
        private readonly userGetService: UserGetService,
    ) {}

    async use(req: Request, _res: Response, next: (error?: any) => void) {
        RequestContext.start();
        const url = new URL(`http://${req.hostname}/${req.originalUrl}`);
        const params = url.searchParams;
        const requestId = apm?.currentTransaction?.ids['transaction.id'];
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const sessionToken = authHeader.replace('Bearer ', '');
            const payload = this.identityGetSessionTokenSecret.run(sessionToken) as JwtPayload;
            const [user, enterprise] = await Promise.all([
                this.userGetService.run({ userId: payload._id }),
                this.enterpriseGetService.run({
                    enterpriseId: payload.enterpriseId,
                }),
            ]);
            RequestContext.updateContext({ user, sessionToken, enterprise });
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
