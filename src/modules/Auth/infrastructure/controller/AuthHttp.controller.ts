import { AuthLoginService } from "@Auth/application/AuthLogin.service";
import { AuthLoginDto } from "@Auth/application/dto/AuthLogin.dto";
import { Body, Controller, Post } from "@nestjs/common";
import { BaseHttpController } from "@Shared/controller/BaseHttp.controller";

@Controller('auth')
export class AuthHttpController extends BaseHttpController {
    constructor (
        private readonly authLoginService: AuthLoginService
    ) {
        super();
    }

    @Post('login')
    public async login (@Body() dto: AuthLoginDto) {

    }
}