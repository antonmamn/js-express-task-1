import {AppDataSource} from "./data-source"
import * as express from "express";
import {Post} from "./entity/Post";
import {Book} from "./entity/Book";
import {UserBook} from "./entity/UserBook";
import {User} from "./entity/User";
import {ArrayContains, UpdateResult} from "typeorm";

const port: number = 3000
const app = express();
app.use(express.json())

const userRepository = AppDataSource.getRepository(User)
const postRepository = AppDataSource.getRepository(Post)
const bookRepository = AppDataSource.getRepository(Book)
const userBookRepository = AppDataSource.getRepository(UserBook)
AppDataSource.initialize().then(async () => {

    app.post('/users', async (req, res) => {
        try {
            let user: User = req.body
            const savedUser = await userRepository.save(user);
            res.send(savedUser)
        } catch (error) {
            res.status(500).send(error)
        }
    })

    app.get('/users', async (req, res) => {
        try {
            let users: User[] = await userRepository.find()
            res.send(users)
        } catch (error) {
            res.status(500).send(error)
        }
    })

    app.get('/users/:id', async (req, res) => {
        try {
            let user: User = await userRepository.findOneBy({id: req.params.id})
            if (user) {
                res.send(user)
            } else {
                res.status(404).json("user was not found in database")
            }

        } catch (error) {
            res.status(500).send(error)
        }

    })

    app.put('/users/:id', async (req, res) => {
        try {
            let updateResult: UpdateResult = await userRepository.update(req.params.id, req.body)

            if (updateResult.affected === 1) {
                res.send(updateResult)
            } else {
                res.status(404).json(`user with id: ${req.params.id}  was not found in database`)
            }

        } catch (error) {
            res.status(500).send(error)
        }
    })

    app.post('/posts', async (req, res) => {
        try {

            let post: Post = req.body
            const user: User = await userRepository.findOneBy({id: post.author})
            if (user) {
                const savedPost = await postRepository.save(post);
                res.send(savedPost)
            } else {
                res.status(404).json(`author with id : ${post.author} was not found in database`)
            }
        } catch (error) {
            res.status(500).send(error)
        }
    })

    app.get('/posts', async (req, res) => {
        try {
            let posts: Post[] = await postRepository.find()
            res.send(posts)
        } catch (error) {
            res.status(500).send(error)
        }
    })

    app.get('/posts/:id', async (req, res) => {
        try {
            let post: Post = await postRepository.findOneBy({id: req.params.id})
            if (post) {
                res.send(post)
            } else {
                res.status(404).json("post was not found in database")
            }

        } catch (error) {
            res.status(500).send(error)
        }

    })

    app.put('/posts/:id', async (req, res) => {
        try {
            let post: Post = req.body
            const user: User = await userRepository.findOneBy({id: post.author})
            if (user) {
                let updateResult: UpdateResult = await postRepository.update(req.params.id, req.body)
                if (updateResult.affected === 1) {
                    res.send(updateResult)
                } else {
                    res.status(404).json(`post with id: ${req.params.id}  was not found in database`)
                }
            } else {
                res.status(404).json(`author with id : ${post.author} was not found in database`)
            }
        } catch (error) {
            res.status(500).send(error)
        }
    })

    app.post('/books', async (req, res) => {
        try {
            let book: Book = req.body.book
            const savedBook = await bookRepository.save(book);
            for (const userId of req.body.userIds) {
                const user: User = await userRepository.findOneBy({id: userId})
                if (!user) {
                    res.status(404).json(`author with id : ${userId} was not found in database`)
                }
            }

            let userbookarray: UserBook[] = []
            const userIds: number[] = req.body.userIds
            for (const userid of userIds) {
                const userBook: UserBook = new UserBook()
                userBook.user = await userRepository.findOneBy({id: userid})
                userBook.book = savedBook
                userbookarray.push(userBook)
            }
            let savedRelation = await userBookRepository.save(userbookarray)
            res.send(savedBook)

        } catch (error) {
            res.status(500).send(error)
        }
    })

    app.get('/books', async (req, res) => {
        try {
            let books: Book[] = await bookRepository.find()
            res.send(books)
        } catch (error) {
            res.status(500).send(error)
        }
    })

    app.get('/books/:id', async (req, res) => {
        try {
            let book: Book = await bookRepository.findOneBy({id: req.params.id})
            if (book) {
                res.send(book)
            } else {
                res.status(404).json("post was not found in database")
            }

        } catch (error) {
            res.status(500).send(error)
        }

    })

    app.put('/books/:id', async (req, res) => {
        try {
            let book: Book = req.body.book
            for (const userId of req.body.userIds) {
                const user: User = await userRepository.findOneBy({id: userId})
                if (!user) {
                    res.status(404).json(`author with id : ${userId} was not found in database`)
                }
            }
            let updateResult: UpdateResult = await bookRepository.update(req.params.id, book)
            if (updateResult.affected === 1) {
                res.send(updateResult)
            } else {
                res.status(404).json(`post with id: ${req.params.id}  was not found in database`)
            }
        } catch (error) {
            res.status(500).send(error)
        }
    })

    app.get('/stats/:id', async (req, res) => {
        let bookCount = await userBookRepository.countBy({
            user: req.params.id
        })
        if (bookCount) {
            res.send({
                user: req.params.id,
                bookCount: bookCount
            });
        } else {
            res.status(404).json("user was not found in database")
        }
    })

    app.post('/author', async (req, res) => {
        try {
            await AppDataSource.transaction(async (transactionalEntityManager) => {
                const user: User = await userRepository.save(req.body.user)
                const book: Book = await bookRepository.save(req.body.book)
                const userBook: UserBook = new UserBook()
                userBook.user = user
                userBook.book = book
                await userBookRepository.save(userBook)
                res.send({user: user, book: book, userBook: userBook})
            })
        } catch (error) {
            res.status(500).send(error)
        }
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}).catch(error => console.log(error))
