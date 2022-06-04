import { BaseException } from "@Shared/exception/Exception.base";

export class EnterpriseCouldNotBeRegisteredException extends BaseException {
	constructor () {
		super(
			'Enterprise could not be registered',
			'Enterprise could not be registered',
			500
		)
	}
}