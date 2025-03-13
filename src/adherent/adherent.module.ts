import { Module } from '@nestjs/common';
import { AdherentController } from './adherent.controller';
import { AdherentService } from './adherent.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdherentEntity } from './adherent.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([AdherentEntity]),
  ],
  controllers: [AdherentController],
  providers: [JwtService, AdherentService],
})
export class AdherentModule { }