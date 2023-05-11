const {Model, DataTypes} = require('sequelize');
const db = require('../index');
const {sequelize} = db;

class Book extends Model {
}

Book.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: DataTypes.STRING,
    genre: DataTypes.STRING,

}, {
    sequelize,
    modelName: 'Book',

});
module.exports = Book
