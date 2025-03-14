import { Body, Controller, Post, Param, Patch, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard} from "./local-auth-guard";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    register(@Body() registerDto: any) {
        return this.authService.register(registerDto)
    }

    // //methode pour valider le compte
    // @Patch('validate/:id') // route pour valider un compte
    // @UseGuards(JwtGuard, RolesGuard) // Protection de la route avec les gardes
    // @SetMetadata('expectedRoles', ['admin']) // exiger le role admin
    // async validateUser(@Param('id') id: number, @Body('role') role: string) {
    //     return this.authenticationService.validateUser(id, role);
    // }

}
