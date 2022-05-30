import { BaseException } from "@Shared/exception/Exception.base";

export class UserJustExistsException extends BaseException {
	constructor (
		email: string,
		companyId: string,
	) {
		super(
			'User just exists',
			'User with emai: {{email}} just exists in company {{companyId}}',
			{ email, companyId },
			400
		)
	}
}