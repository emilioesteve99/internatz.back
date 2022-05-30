import { Global, Module } from "@nestjs/common";
import { AuthHttpController } from "@Auth/infrastructure/controller/AuthHttp.controller";
import { AuthLoginService } from "@Auth/application/AuthLogin.service";
import { AuthGetUserService } from "@Auth/application/AuthGetUser.service";
import { AuthMongoRepository } from "@Auth/infrastructure/persistence/mongo/AuthMongo.repository";
import { MongoClient } from "mongodb";
import { CacheService } from "@Shared/cache/Cache.service";
import { SharedConstants } from "@Shared/Shared.constants";
import { AuthSignUpService } from "./application/AuthSignUp.service";

@Global()
@Module({
    controllers: [AuthHttpController],
    providers: [
        AuthLoginService,
        AuthSignUpService,
        AuthGetUserService,
        AuthMongoRepository,
    ],
    exports: [
        AuthGetUserService,
    ]
})
export class AuthModule {};