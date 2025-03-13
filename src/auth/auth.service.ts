import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,

        @InjectRepository(AuthEntity)
        private authenticationRepository: Repository<AuthEntity>
    ) { }

    async signup(email: string, password: string) {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        const newAuth = this.authenticationRepository.create({
            email: email,
            hash: hash,
            role: 'joueur',
            isValidated: false // doit etre validé par le club 
        });

        return this.authenticationRepository.save(newAuth);
    }

    async signin(email: string, password: string) {
        const user = await this.authenticationRepository.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new Error('Utilisateur non trouvé');
        }

        if(!user.isValidated) {
            throw new Error("Compte en attente de validation");
        }

        const isAuthenticated = await bcrypt.compare(password, user.hash);

        if (isAuthenticated) {
            const secret = this.configService.get<string>('JWT_SECRET');
            return this.jwtService.sign(
                {
                    email: user.email,
                    role: user.role
                },
                { secret, expiresIn: '1h' }
            );
        }

        return;

    }


    async validateUser(id: number, role: string){
        const user = await this.authenticationRepository.findOne({where: {id}});

        if(!user) {
            throw new Error("Urilisateur introuvable");
        }

        user.isValidated = true;
        user.role = role; // un admin attribut le role
        return this.authenticationRepository.save(user);
    }
}


