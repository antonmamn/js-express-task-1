const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

const db = require('./models');
const {sequelize} = db;
const {Model, DataTypes} = require("sequelize");
const User = require("./models/user")(sequelize, DataTypes);
const Post = require("./models/post")(sequelize, DataTypes);
const Book = require("./models/book")(sequelize, DataTypes);
const UserBook = require("./models/user-book")(sequelize, DataTypes);

app.get('/users', (req, res) => {
    User.findAll()
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.get('/users/:id', (req, res) => {
    User.findByPk(req.params.id)
        .then(data => res.send(data))
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
        .then(data => res.send(data))
        .catch(error => res.send(error))
})

app.delete('/users/:id', (req, res) => {

    const user = User.destroy({
        where: {id: req.params.id}
    })
        .then(rowsAffected=>{
            console.log(rowsAffected)
            if (rowsAffected==0){
                res.status(404).json({message:"user not found"})
            }else{
                res.status(200).json({message:"user deleted succesfully",rowsAffected})
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
    Post.findAll(/*{ include: User,as:'users' }*/)
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.get(`/posts/:id`, (req, res) => {
    Post.findByPk(req.params.id)
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.put('/posts/:id', (req, res) => {
    Post.update(req.body, {
        where: {id: req.params.id}
    })
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.delete('/posts/:id', (req, res) => {

    const user = Post.destroy({
        where: {id: req.params.id}
    })
        .then(res.end())
        .catch(error => res.send(error))
})

app.post(`/books`, (req, res) => {

    Book.create(req.body.book)
        .then(data => {
            let userbookarray=[]
            const userids=req.body.userids
            console.log(userids)
            for (const userid of userids) {
                const userBook={"userId":userid,"bookId":data.id}
                userbookarray.push(userBook)
            }
                UserBook.bulkCreate(userbookarray)
                res.send(data)
            }
        )
        .catch(error => res.send(error))
})
app.get(`/books`, (req, res) => {
    Book.findAll(/*{ include: User,as:'users' }*/)
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.get(`/books/:id`, (req, res) => {
    Book.findByPk(req.params.id)
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.put('/books/:id', (req, res) => {
    Book.update(req.body, {
        where: {id: req.params.id}
    })
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.delete('/books/:id', (req, res) => {

    const book = Book.destroy({
        where: {id: req.params.id}
    })
        .then(rowsAffected=>{
            console.log(rowsAffected)
            if (rowsAffected==0){
                res.status(404).json({message:"book not found"})
            }else{
                res.status(200).json({message:"book deleted succesfully",rowsAffected})
            }
        })
        .catch(error => res.send(error))
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
