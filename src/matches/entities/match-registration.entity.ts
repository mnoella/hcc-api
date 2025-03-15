import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { MatchEntity } from "./match.entity";

@Entity("match-registration")
@Unique(["player", "match"])
export class MatchRegistrationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    registrationDate: Date;

    @ManyToOne(
        () => UserEntity,
        (user) => user.matchRegistrations,
    )
    player: UserEntity;

    @ManyToOne(
        () => MatchEntity,
        (match) => match.registrations,
        { onDelete: "CASCADE"},
    )
    match: MatchEntity;
}