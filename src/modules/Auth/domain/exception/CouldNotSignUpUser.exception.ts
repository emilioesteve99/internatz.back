import { BaseException } from '@Shared/exception/Exception.base';

export class CouldNotSignUpUserException extends BaseException {
    constructor() {
        super('Could not sign up user', 'Could not sign up user', {}, 500);
    }
}
