import { BaseException } from "@Shared/exception/Exception.base";

export class WrongUserOrPasswordException extends BaseException {
	constructor () {
		super(
			'Wrong user or password',
			'Wrong user or password',
			{},
			401
		)
	}
}