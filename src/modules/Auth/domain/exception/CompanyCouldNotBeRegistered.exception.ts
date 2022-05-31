import { BaseException } from "@Shared/exception/Exception.base";

export class CompanyCouldNotBeRegisteredException extends BaseException {
	constructor () {
		super(
			'Company could not be registered',
			'Company could not be registered',
			500
		)
	}
}