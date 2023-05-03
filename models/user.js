const {Model, DataTypes} = require('sequelize');
const db = require('../index');
const {sequelize} = db;


    class User extends Model {

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
 module.exports=User