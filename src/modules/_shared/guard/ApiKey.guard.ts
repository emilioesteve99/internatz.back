import { EnterpriseGetByApiKeyService } from '@Enterprise/application/EnterpriseGetByApiKey.service';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RequestContext } from '@Shared/context/RequestContext';
import { UnauthorizedUserException } from '@Shared/exception/UnauthorizedUser.exception';

export class ApiKeyGuard implements CanActivate {
    constructor(private readonly enterpriseGetByApiKey: EnterpriseGetByApiKeyService) {}

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const httpContext = context.switchToHttp();
        const { body } = httpContext.getRequest();
        const exception = new UnauthorizedUserException();
        if (!body) throw exception;
        const { apiKey } = body;
        if (!apiKey) throw exception;
        const enterprise = await this.enterpriseGetByApiKey.run({ apiKey });
        RequestContext.updateContext({ enterprise });
        return true;
    }
}
