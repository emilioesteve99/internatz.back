import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { RequestContext } from "@Shared/context/RequestContext";
import { UnauthorizedUserException } from "@Shared/exception/UnauthorizedUser.exception";
import { Request } from "express";

@Injectable()
export class EndpointPermissionGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const httpContext = context.switchToHttp();
		const req: Request = httpContext.getRequest();
		const url = new URL(`http://localhost:4100${req.originalUrl}`).pathname;
		const endpoint = url.toLowerCase().replace('/api/internatz-back', '');
		const exception = new UnauthorizedUserException();
		const { user } = RequestContext.get();
		if (user.isAdmin) return true;
		if (!user) throw exception;
		if (!user.hasPermission('endpoint', endpoint)) throw exception;
		return true;
	}	
}