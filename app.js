const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

const associations = require("./associations")
const User = require("./models/user")
const Post = require("./models/post")
const Book = require("./models/book")
const UserBook = require("./models/user-book")

app.get('/users', (req, res) => {
    User.findAll()
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.get('/users/:id', (req, res) => {
    User.findByPk(req.params.id)
        .then(data => {
                console.log(data)
                if (data) {
                    res.send(data)
                } else {
                    res.status(404).json("user was not found in database")
                }
            }
        )
        .catch(error => res.send(error))
})
app.post('/users', (req, res) => {

    const user = User.create(req.body)
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.put('/users/:id', (req, res) => {

    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(data => {
            if (data[0] === 1) {
                res.send(data)
            } else {
                res.status(404).json(`user with id: ${req.params.id}  was not found in database`)
            }

        })
        .catch(error => res.send(error))
})

app.delete('/users/:id', (req, res) => {

    const user = User.destroy({
        where: {id: req.params.id}
    })
        .then(rowsAffected => {
            if (rowsAffected == 0) {
                res.status(404).json({message: "user not found"})
            } else {
                res.status(200).json({message: "user deleted succesfully", rowsAffected})
            }
        })
        .catch(error => res.send(error))
})
app.post(`/posts`, (req, res) => {
    Post.create(req.body)
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.get(`/posts`, (req, res) => {
    Post.findAll()
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.get(`/posts/:id`, (req, res) => {
    Post.findByPk(req.params.id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send(`post with id: ${req.params.id}  was not found in database`)
            }
        })
        .catch(error => res.send(error))
})
app.put('/posts/:id', (req, res) => {
    Post.update(req.body, {
        where: {id: req.params.id}
    })
        .then(data => {
            if (data[0] === 1) {
                res.send(data)
            } else {
                res.status(404).send(`post with id: ${req.params.id}  was not found in database`)
            }
        })
        .catch(error => res.send(error))
})
app.delete('/posts/:id', (req, res) => {

    const post = Post.destroy({
        where: {id: req.params.id}
    })
        .then(rowsAffected => {
            if (rowsAffected == 0) {
                res.status(404).json({message: "post not found"})
            } else {
                res.status(200).json({message: "post deleted succesfully", rowsAffected})
            }
        })
        .catch(error => res.send(error))
})

app.post(`/books`, (req, res) => {

    Book.create(req.body.book)
        .then(data => {
                let userbookarray = []
                const userids = req.body.userids
                for (const userid of userids) {
                    const userBook = {"userId": userid, "bookId": data.id}
                    userbookarray.push(userBook)
                }
                UserBook.bulkCreate(userbookarray)
                res.send(data)
            }
        )
        .catch(error => res.send(error))
})
app.get(`/books`, (req, res) => {
    Book.findAll({
        include: {
            model: User,
            attributes: ['id'],
            through: {attributes: []}
        }
    })
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.get(`/books/:id`, (req, res) => {
    Book.findByPk(req.params.id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send(`book with id: ${req.params.id}  was not found in database`)
            }
        })
        .catch(error => res.send(error))
})
app.put('/books/:id', (req, res) => {
    Book.update(req.body, {
        where: {id: req.params.id}
    })
        .then(data => {
            if (data[0] === 1) {
                res.send(data)
            } else {
                res.status(404).send(`post with id: ${req.params.id}  was not found in database`)
            }
        })
        .catch(error => res.send(error))
})
app.delete('/books/:id', (req, res) => {

    const book = Book.destroy({
        where: {id: req.params.id}
    })
        .then(rowsAffected => {
            console.log(rowsAffected)
            if (rowsAffected == 0) {
                res.status(404).json({message: "book not found"})
            } else {
                res.status(200).json({message: "book deleted succesfully", rowsAffected})
            }
        })
        .catch(error => res.send(error))
})

module.exports = app