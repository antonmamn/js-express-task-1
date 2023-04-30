const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {

        static associate(models) {
       Book.belongsToMany(models.User, {through: `associate-user-book`,onDelete: 'CASCADE'})
        }
    }

    Book.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: DataTypes.STRING,
        genre: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Book',
    });
    return Book;
};