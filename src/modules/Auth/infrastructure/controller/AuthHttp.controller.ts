import { AuthLoginService } from "@Auth/application/AuthLogin.service";
import { AuthSignUpService } from "@Auth/application/AuthSignUp.service";
import { AuthLoginDto } from "@Auth/application/dto/AuthLogin.dto";
import { AuthSignUpDto } from "@Auth/application/dto/AuthSignUp.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";

@Controller('auth')
export class AuthHttpController extends BaseHttpController {
    constructor (
        private readonly authLoginService: AuthLoginService,
        private readonly authSignUpService: AuthSignUpService,
    ) {
        super();
    }

    @Post('login')
    public async login (@Body() dto: AuthLoginDto) {
        const user = await this.authLoginService.run(dto);
        return this.success({ logged: user });
    }

    @Post('signup')
    public async signUp (@Body() dto: AuthSignUpDto) {
        const user = await this.authSignUpService.run(dto);
        return this.success({ signedUp: user });
    }
}