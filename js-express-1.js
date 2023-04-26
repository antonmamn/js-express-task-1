const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.raw())

const Sequelize = require('sequelize');
const {Model, DataTypes} = require("sequelize");
const sequelize = new Sequelize('JS_EXPRESS', 'postgres', 'antoni', {
    host: 'localhost', dialect: 'postgres', logging: false,
});

class User extends Model {
}

User.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING},
    last_name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING,}
}, {sequelize, modelName: `User`, timestamps: false})


app.get('/users/getAll', (req, res) => {
    User.findAll()
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.get('/users/getById/:id', (req, res) => {
    User.findByPk(req.params.id)
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.post('/users/add', (req, res) => {

    const user = User.create(req.body)
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.put('/users/update/:id', (req, res) => {

    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.delete('/users/delete/:id', (req, res) => {

    const user = User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(res.end())
        .catch(error => res.send(error))
})

class Post extends Model {
}

Post.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING},
        text: {type: DataTypes.STRING},
        author: {type: DataTypes.INTEGER, references: {model: User, key: `id`}}
    },
    {sequelize, modelName: `Post`, timestamps: false})

app.post(`/posts/add`, (req, res) => {
    const post = Post.create(req.body)
        .then(data => res.send(data))
        .catch(error => res.send(error))
})

app.get(`/posts/getAll`, (req, res) => {
    Post.findAll()
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.get(`/posts/getById/:id`, (req, res) => {
    Post.findByPk(req.params.id)
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.put('/posts/update/:id', (req, res) => {

    Post.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(data => res.send(data))
        .catch(error => res.send(error))
})
app.delete('/posts/delete/:id', (req, res) => {

    const user = Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(res.end())
        .catch(error => res.send(error))
})
app.listen(port, () => {
    User.sync({force: true})
    Post.sync({force: true})
    console.log(`Example app listening on port ${port}`)
})
