import { Injectable } from '@nestjs/common';
import { getEnv } from '@Shared/environment/GetEnv';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class IdentityGetSessionTokenContentService {
    private readonly tokenSecret = getEnv<string>('tokenSecret');

    constructor() {}

    public run(token: string) {
        return jwt.verify(token, this.tokenSecret);
    }
}
