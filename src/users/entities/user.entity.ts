import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { NewsEntity } from "src/news/entities/news.entity";
import { MatchRegistrationEntity } from "src/matches/entities/match-registration.entity";

export enum UserRole {
    COACH= "coach",
    CONTRIBUTOR="contributor",
    PLAYER = "player",
}

export enum UserStatus {
    PENDING = "pending",
    ACTIVE= "active",
}

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({
        type: "simple-enum",
        enum: UserRole,
        default: UserRole.PLAYER,
    })
    role: UserRole

    @Column({
        type: "simple-enum",
        enum: UserStatus,
        default: UserStatus.PENDING,
    })
    status: UserStatus;

    @CreateDateColumn()
    registrationDate: Date;

    @OneToMany(
        () => NewsEntity,
        (news) => news.author,
    )
    news: NewsEntity[];

    @OneToMany(
        () => MatchRegistrationEntity,
        (registration) => registration.player,
    )
    matchRegistrations: MatchRegistrationEntity[];
}