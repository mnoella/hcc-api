import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("authentication")
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    hash: string;

    @Column({ default: 'joueur' })
    role: string;

    @Column({ default: false })
    isValidated: boolean;
}