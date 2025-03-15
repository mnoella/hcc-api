import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { MatchRegistrationEntity } from "./match-registration.entity";

@Entity("matches")
export class MatchEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "date", unique: true })
    date: Date;

    @Column()
    opponent: string;

    @Column({ default: 0 })
    hccScore: number;

    @Column({ default: 0 })
    opponentScore: number;

    @ManyToOne(() => UserEntity)
    createdBy: UserEntity;

    @OneToMany(
        () => MatchRegistrationEntity,
        (registration) => registration.match,
    )
    registrations: MatchRegistrationEntity[];
}