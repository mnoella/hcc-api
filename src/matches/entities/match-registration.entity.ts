import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { MatchEntity } from "./match.entity";

@Entity("match-registration")
export class MatchRegistrationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    registrationDate;

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