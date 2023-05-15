import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import {User} from "./User";
import {Book} from "./Book";

@Entity()
export class UserBook {


    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Book, (book) => book.userBook,)
    book: Book

    @ManyToOne(() => User, (user) => user.userBook,)
    user: User
}