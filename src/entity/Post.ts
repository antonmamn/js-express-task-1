import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm"
import {User} from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    text: string

    @Column()
    author: number

    @ManyToOne(() => User, (user) => user.posts,{eager:true})
    @JoinColumn({name: "author"})
    user: User
}