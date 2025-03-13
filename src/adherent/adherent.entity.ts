import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity("adherent")
export class AdherentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: string

    @Column({ type: 'text', default: () => 'CURRENT_TIMESTAMP'})
    registrationDate: Date;

    // @ManyToMany(() => Match, (match) => match.participants)
    // @JoinTable()
    // matchs: Match[];

}