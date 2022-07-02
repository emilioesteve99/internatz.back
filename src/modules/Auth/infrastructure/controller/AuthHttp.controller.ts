import { AuthLoginService } from "@Auth/application/AuthLogin.service";
import { AuthRegisterEnterpriseService } from "@Auth/application/AuthRegisterEnterprise.service";
import { AuthSignUpService } from "@Auth/application/AuthSignUp.service";
import { AuthLoginDto } from "@Auth/application/dto/AuthLogin.dto";
import { AuthRegisterEnterpriseDto } from "@Auth/application/dto/AuthRegisterEnterprise.dto";
import { AuthSignUpDto } from "@Auth/application/dto/AuthSignUp.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";

@ApiTags('Auth')
@Controller('auth')
export class AuthHttpController extends BaseHttpController {
    constructor(
        private readonly authLoginService: AuthLoginService,
        private readonly authSignUpService: AuthSignUpService,
        private readonly authRegisterEnterpriseService: AuthRegisterEnterpriseService,
    ) {
        super();
    }

    @Post('login')
    public async login(@Body() dto: AuthLoginDto) {
        const accessToken = await this.authLoginService.run(dto);
        return this.success({ accessToken });
    }

    @Post('signup')
    public async signUp(@Body() dto: AuthSignUpDto) {
        const accessToken = await this.authSignUpService.run(dto);
        return this.success({ accessToken });
    }

    @Post('registerEnterprise')
    public async registerEnterprise(@Body() dto: AuthRegisterEnterpriseDto) {
        const enterprise = await this.authRegisterEnterpriseService.run(dto);
        return this.success({ enterprise });
    }
}