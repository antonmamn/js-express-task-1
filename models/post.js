const {Model, DataTypes} = require('sequelize');
const db = require('../index');
const {sequelize} = db;
    class Post extends Model {

    }

    Post.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING},
        text: {type: DataTypes.STRING},
        author: {type: DataTypes.INTEGER, references: {model: 'User', key: `id`}}
    }, {sequelize, modelName: `Post`, timestamps: false});

    module.exports =Post