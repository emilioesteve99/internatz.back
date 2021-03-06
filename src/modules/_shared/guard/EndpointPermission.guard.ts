import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestContext } from '@Shared/context/RequestContext';
import { UnauthorizedUserException } from '@Shared/exception/UnauthorizedUser.exception';
import { Request } from 'express';

@Injectable()
export class EndpointPermissionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const { user } = RequestContext.get();
        const exception = new UnauthorizedUserException();
        if (!user) throw exception;
        if (user.isAdmin) return true;
        const httpContext = context.switchToHttp();
        const req: Request = httpContext.getRequest();
        const enterpriseId = req.body?.enterpriseId;
        if (enterpriseId && enterpriseId !== user.enterpriseId) throw exception;
        const url = new URL(`http://localhost:4100${req.originalUrl}`).pathname;
        const endpoint = url.toLowerCase().replace('/api/internatz-back', '');
        if (!user.hasPermission('endpoint', endpoint)) throw exception;
        return true;
    }
}
