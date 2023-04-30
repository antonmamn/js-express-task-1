const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {foreignKey: 'author'});
        }
    }

    Post.init({
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        title: {type: DataTypes.STRING},
        text: {type: DataTypes.STRING},
        author: {type: DataTypes.INTEGER, references: {model: 'User', key: `id`}}
    }, {sequelize, modelName: `Post`, timestamps: false});
    return Post;
};