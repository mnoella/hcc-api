import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserEntity } from "src/users/entities/user.entity";

@Entity("news")
export class NewsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column("text")
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(
        () => UserEntity,
        (user) => user.news,
    )
    author: UserEntity;
}