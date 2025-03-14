import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserStatus } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
          throw new UnauthorizedException("Invalid credentials");
        }
        if (user.status !== UserStatus.ACTIVE) {
          throw new UnauthorizedException("Account not activated yet");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException("Invalid credentials");
        }
        const { password: _, ...result } = user;
        return result;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id, role: user.role};
        return { access_token: this.jwtService.sign(payload),}
    }

    async register(userData: any){
        return this.usersService.create(userData);
    }

}