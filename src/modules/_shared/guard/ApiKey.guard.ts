import { EnterpriseGetByApiKeyService } from '@Enterprise/application/EnterpriseGetByApiKey.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestContext } from '@Shared/context/RequestContext';
import { UnauthorizedUserException } from '@Shared/exception/UnauthorizedUser.exception';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(private readonly enterpriseGetByApiKeyService: EnterpriseGetByApiKeyService) { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const httpContext = context.switchToHttp();
        const { body } = httpContext.getRequest();
        const exception = new UnauthorizedUserException();
        if (!body) throw exception;
        const { apiKey } = body;
        if (!apiKey) throw exception;
        const enterprise = await this.enterpriseGetByApiKeyService.run({ apiKey });
        RequestContext.updateContext({ enterprise });
        return true;
    }
}
