import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchEntity } from "./entities/match.entity";
import { MatchRegistrationEntity } from "./entities/match-registration.entity";
import { UsersModule } from "src/users/users.module";
import { MatchesController } from "./matches.controller";
import { MatchesService } from "./matches.service";

@Module({
    imports: [TypeOrmModule.forFeature([MatchEntity, MatchRegistrationEntity]), UsersModule],
    controllers: [MatchesController],
    providers: [MatchesService],
})
export class MatchesModule {}