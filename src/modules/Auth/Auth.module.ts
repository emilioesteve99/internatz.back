import { Global, Module } from "@nestjs/common";
import { AuthHttpController } from "@Auth/infrastructure/controller/AuthHttp.controller";
import { AuthLoginService } from "@Auth/application/AuthLogin.service";
import { AuthGetUserService } from "@Auth/application/AuthGetUser.service";
import { AuthMongoRepository } from "@Auth/infrastructure/persistence/mongo/AuthMongo.repository";
import { AuthSignUpService } from "./application/AuthSignUp.service";
import { AuthRegisterCompanyService } from "./application/AuthRegisterCompany.service";

@Global()
@Module({
    controllers: [AuthHttpController],
    providers: [
        AuthLoginService,
        AuthSignUpService,
        AuthGetUserService,
        AuthRegisterCompanyService,
        AuthMongoRepository,
    ],
    exports: [
        AuthGetUserService,
    ]
})
export class AuthModule {};