import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {UserBook} from "./UserBook";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    genre: string

    @OneToMany(() => UserBook, (userBook) => userBook.book, {
        cascade: true,
        eager:true
    })
    userBook: UserBook[]

}