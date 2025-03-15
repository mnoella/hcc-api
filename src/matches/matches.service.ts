import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MatchEntity } from "./entities/match.entity";
import { Between, Repository } from "typeorm";
import { MatchRegistrationEntity } from "./entities/match-registration.entity";
import { UsersService } from "src/users/users.service";
import { UserEntity, UserRole } from "src/users/entities/user.entity";
import { CreateMatchDto } from "./dto/create-match.dto";


@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(MatchEntity)
    private matchRepository: Repository<MatchEntity>,
    @InjectRepository(MatchRegistrationEntity)
    private matchRegistrationRepository: Repository<MatchRegistrationEntity>,
    private usersService: UsersService,
  ) {}

  async create(matchData: CreateMatchDto, coach: UserEntity): Promise<MatchEntity> {
    // Vérifier s'il y a déjà un match à cette date
    const matchDate = new Date(matchData.date);
    const startOfDay = new Date(matchDate.setHours(0,0,0,0));
    const endOfDay = new Date(matchDate.setHours(23,59,59,999));

    const existingMatch = await this.matchRepository.findOne({
      where: {
        date: Between(startOfDay, endOfDay),
      },
    })

    if (existingMatch) {
      throw new ConflictException(`A match is already scheduled on ${matchData.date}`)
    }

    const match = this.matchRepository.create({
      ...matchData,
      createdBy: coach,
    });
    
    return this.matchRepository.save(match)
  }

  async findAll(): Promise<MatchEntity[]> {
    return this.matchRepository.find({
      relations: ["createdBy", "registrations", "registrations.player"],
    })
  }

  async findOne(id: number): Promise<MatchEntity> {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ["createdBy", "registrations", "registrations.player"],
    })

    if (!match) {
      throw new NotFoundException(`Match with ID ${id} not found`)
    }

    return match
  }

  async update(id: number, updateData: any): Promise<MatchEntity> {
    const match = await this.findOne(id)

    Object.assign(match, updateData)

    return this.matchRepository.save(match)
  }

  async registerPlayer(matchId: number, playerId: number): Promise<MatchRegistrationEntity> {
    const match = await this.findOne(matchId)
    const player = await this.usersService.findOne(playerId)

    if (player.role !== UserRole.PLAYER) {
      throw new ForbiddenException("Only players can register for matches")
    }

    // Vérifier si le joueur est déjà inscrit
    const existingRegistration = await this.matchRegistrationRepository.findOne({
      where: {
        match: { id: matchId },
        player: { id: playerId },
      },
    })

    if (existingRegistration) {
      throw new ConflictException("Player is already registered for this match")
    }

    const registration = this.matchRegistrationRepository.create({
      match,
      player,
    })

    return this.matchRegistrationRepository.save(registration)
  }

  async unregisterPlayer(matchId: number, playerId: number): Promise<void> {
    const registration = await this.matchRegistrationRepository.findOne({
      where: {
        match: { id: matchId },
        player: { id: playerId },
      },
    })

    if (!registration) {
      throw new NotFoundException("Player is not registered for this match")
    }

    await this.matchRegistrationRepository.remove(registration)
  }
}

