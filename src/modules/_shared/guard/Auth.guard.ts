import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestContext } from '@Shared/context/RequestContext';
import { UnauthorizedUserException } from '@Shared/exception/UnauthorizedUser.exception';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(_context: ExecutionContext): boolean {
        const { user } = RequestContext.get();
        if (!user) throw new UnauthorizedUserException();
        return true;
    }
}
