import { Injectable } from "@nestjs/common";
import { User } from "@Shared/entity/User.entity";
import { getEnv } from "@Shared/environment/GetEnv";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthSignTokenService {
    private readonly tokenSecret = getEnv<string>('tokenSecret');

    public async run(user: User) {
        return jwt.sign({
            _id: user._id,
            enterpriseId: user.enterpriseId,
        }, this.tokenSecret, {
            expiresIn: "23h"
        });
    }
}