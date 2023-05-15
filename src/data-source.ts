import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Post} from "./entity/Post";
import {Book} from "./entity/Book";
import {UserBook} from "./entity/UserBook";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "antoni",
    database: "JS_EXPRESS_TEST",
    synchronize: true,
    logging: true,
    entities: ["src/entity/*.ts"],
    subscribers: [],
    migrations: [],
})

