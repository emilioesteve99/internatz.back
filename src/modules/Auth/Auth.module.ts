import { Global, Module } from "@nestjs/common";
import { AuthHttpController } from "@Auth/infrastructure/controller/AuthHttp.controller";
import { AuthLoginService } from "@Auth/application/AuthLogin.service";
import { AuthGetUserService } from "@Auth/application/AuthGetUser.service";
import { AuthMongoRepository } from "@Auth/infrastructure/persistence/mongo/AuthMongo.repository";
import { AuthSignUpService } from "@Auth/application/AuthSignUp.service";
import { AuthRegisterEnterpriseService } from "./application/AuthRegisterEnterprise.service";

@Global()
@Module({
    controllers: [AuthHttpController],
    providers: [
        AuthLoginService,
        AuthSignUpService,
        AuthGetUserService,
        AuthRegisterEnterpriseService,
        AuthMongoRepository,
    ],
    exports: [
        AuthGetUserService,
    ]
})
export class AuthModule {};