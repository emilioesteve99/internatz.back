import { BaseException } from '@Shared/exception/Exception.base';

export class EnterpriseNotFoundByApiKey extends BaseException {
    constructor() {
        super('Enterprise not found');
    }
}
