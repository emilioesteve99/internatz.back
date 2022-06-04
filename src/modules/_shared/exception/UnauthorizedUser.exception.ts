import { BaseException } from "./Exception.base";

export class UnauthorizedUserException extends BaseException {
	constructor () {
		super(
			'User not authorized',
			'User not authorized',
			{},
			401
		)
	}
}