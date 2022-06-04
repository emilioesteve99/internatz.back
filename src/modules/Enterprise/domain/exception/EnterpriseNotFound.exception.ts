import { BaseException } from "@Shared/exception/Exception.base";

export class EnterpriseNotFoundException extends BaseException {
	constructor (enterpriseId: string) {
		super(
			'Enterprise not found',
			'Enterprise {{enterpriseId}} not found',
			{ enterpriseId },
			400
		)
	}
}