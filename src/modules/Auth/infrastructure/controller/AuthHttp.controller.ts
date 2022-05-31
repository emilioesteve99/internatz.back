import { AuthLoginService } from "@Auth/application/AuthLogin.service";
import { AuthRegisterCompanyService } from "@Auth/application/AuthRegisterCompany.service";
import { AuthSignUpService } from "@Auth/application/AuthSignUp.service";
import { AuthLoginDto } from "@Auth/application/dto/AuthLogin.dto";
import { AuthRegisterCompanyDto } from "@Auth/application/dto/AuthRegisterCompany.dto";
import { AuthSignUpDto } from "@Auth/application/dto/AuthSignUp.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";

@Controller('auth')
export class AuthHttpController extends BaseHttpController {
    constructor (
        private readonly authLoginService: AuthLoginService,
        private readonly authSignUpService: AuthSignUpService,
        private readonly authRegisterCompanyService: AuthRegisterCompanyService,
    ) {
        super();
    }

    @Post('login')
    public async login (@Body() dto: AuthLoginDto) {
        const accessToken = await this.authLoginService.run(dto);
        return this.success({ accessToken });
    }

    @Post('signup')
    public async signUp (@Body() dto: AuthSignUpDto) {
        const user = await this.authSignUpService.run(dto);
        return this.success({ signedUp: user });
    }

    @Post('registerCompany')
    public async registerCompany(@Body() dto: AuthRegisterCompanyDto) {
        const company = await this.authRegisterCompanyService.run(dto);
        return this.success({ company });
    }
}