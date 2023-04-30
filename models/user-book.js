const {Model, DataTypes} = require("sequelize");
const Post = require(`./post.js`)
module.exports = (sequelize, DataTypes) => {
    class UserBook extends Model {
        static associate(models) {
             models.User.hasMany(models.Post, { onDelete: 'CASCADE'});
            models.User.belongsToMany(models.Book,{through:  models.UserBook,onDelete: 'CASCADE'})
        }
    }
    UserBook.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        userId: {
            type: DataTypes.INTEGER, field: 'user_id', primaryKey: true, references: {
                model: 'Users', key: 'id',
            }
        },
        bookId: {
            type: DataTypes.INTEGER, field: 'book_id', primaryKey: true, references: {
                model: 'Books', key: 'id',
            },
        }
    }, {
        sequelize,
        modelName: `UserBook`,
        tableName:`USER_BOOK`,
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ]
    });
    return UserBook;
};