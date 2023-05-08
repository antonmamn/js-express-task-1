const {Model, DataTypes} = require('sequelize');
const db = require('../index');
const {sequelize} = db;


class UserBook extends Model {
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
    tableName: `USER_BOOK`,
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
});
module.exports = UserBook