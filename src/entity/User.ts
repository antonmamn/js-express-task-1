import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, BeforeInsert, BeforeUpdate} from "typeorm"
import {Post} from "./Post";
import {UserBook} from "./UserBook";
import {IsEmail, Min,} from "class-validator"
import bcrypt from "bcrypt";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        //name: "first_name"
    })
    firstName: string

    @Column()
    lastName: string

    @Column({})
    @IsEmail()
    @Index("email_idx")
    email: string

    @Column()
    @Min(6)
    password: string

    @OneToMany(() => Post, (post) => post.user, {
        cascade: true,
    })
    posts: Post[]

    @OneToMany(() => UserBook, (userBook) => userBook.user, {
        cascade: true,
    })
    userBook: UserBook[]


    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }
}