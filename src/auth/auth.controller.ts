import { Body, Controller, Post, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { SetMetadata } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    constructor(private authenticationService: AuthService) { }

    @Post('login')
    async login(@Body() authDto: AuthDto) {
        const generatedToken = await this.authenticationService.signin(authDto.email, authDto.password);
        return {
            access_token: generatedToken
        };
    }

    @Post('register')
    async register(@Body() authDto: AuthDto) {
        await this.authenticationService.signup(authDto.email, authDto.password);
        const token = await this.authenticationService.signin(authDto.email, authDto.password);
        return { access_token: token };
    }

    //methode pour valider le compte
    @Patch('validate/:id') // route pour valider un compte
    @UseGuards(JwtGuard, RolesGuard) // Protection de la route avec les gardes
    @SetMetadata('expectedRoles', ['admin']) // exiger le role admin
    async validateUser(@Param('id') id: number, @Body('role') role: string) {
        return this.authenticationService.validateUser(id, role);
    }

}
