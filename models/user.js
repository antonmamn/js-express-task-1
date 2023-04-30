const {Model, DataTypes} = require("sequelize");
const Post = require(`./post.js`)
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
           User.hasMany(models.Post, {foreignKey:"author", onDelete: 'CASCADE'});
          User.belongsToMany( models.Book,{through: models.UserBook,onDelete: 'CASCADE'})
        }
    }

    User.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        firstName: {type: DataTypes.STRING, field: 'first_name'},
        lastName: {type: DataTypes.STRING, field: 'last_name'},
        email: {type: DataTypes.STRING,}
    }, {
        sequelize,
        modelName: `User`,
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['email']
            }
        ]
    });
    return User;
};