import { BaseException } from "@Shared/exception/Exception.base";

export class CompanyNotFoundException extends BaseException {
	constructor (companyId: string) {
		super(
			'Company not found',
			'Company {{companyId}} not found',
			{ companyId },
			400
		)
	}
}