'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                firstName: {
                    type: Sequelize.STRING, field: 'first_name'
                },
                lastName: {
                    type: Sequelize.STRING, field: 'last_name'
                },
                email: {
                    type: Sequelize.STRING
                },
            },
        );
        await queryInterface.addIndex('Users', {
            fields: ['email'],
            name: 'users_email_idx'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};