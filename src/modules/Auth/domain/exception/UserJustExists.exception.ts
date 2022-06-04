import { BaseException } from "@Shared/exception/Exception.base";

export class UserJustExistsException extends BaseException {
	constructor (
		email: string,
		enterpriseId: string,
	) {
		super(
			'User just exists',
			'User with emai: {{email}} just exists in enterprise {{enterpriseId}}',
			{ email, enterpriseId },
			400
		)
	}
}