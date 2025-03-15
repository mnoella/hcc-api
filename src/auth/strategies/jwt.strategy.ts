import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SERVICE", "supersecret"),
        })
    }

    async validate(payload: any){
        const user = await this.usersService?.findOne(payload.sub);
        return { id: payload.sub, email: payload.email, role: payload.role, firstName: user.firstName, lastName: user.lastName, }
    }
}