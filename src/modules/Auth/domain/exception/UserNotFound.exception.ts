import { BaseException } from "@Shared/exception/Exception.base";

export class UserNotFoundException extends BaseException {
	constructor (userId: string) {
		super(
			'User not found',
			'User {{userId}} not found',
			{ userId },
			401
		)
	}
}