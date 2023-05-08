const {Model, DataTypes} = require('sequelize');
const db = require('../index');
const {sequelize} = db;
const bcrypt = require('bcrypt');
const {sequelizeJoi, Joi} = require("sequelize-joi");

sequelizeJoi(sequelize);
class User extends Model {
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING,
        field: 'last_name'
    },
    email: {
        type: DataTypes.STRING,
        schema: Joi.string().trim().required().email()
    },
    password: {
        type: DataTypes.STRING,
        schema: Joi.string().trim().required().min(6)
    }
}, {
    sequelize,
    modelName: `User`,
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ],
    hooks: {
        beforeCreate: async (user, options) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
        },
        beforeUpdate: async (user, options) => {
            if (user.changed('password')) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }
        },
    },
});
module.exports = User