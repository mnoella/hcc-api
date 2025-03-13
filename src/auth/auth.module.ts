import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AuthEntity]),
  ],
  controllers: [AuthController],
  providers: [JwtService, AuthService],
})
export class AuthModule { }
