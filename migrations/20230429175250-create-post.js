'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            text: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'Users'
                    },
                    key: "id",

                },
                onDelete: 'CASCADE'
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Posts');
    }
};