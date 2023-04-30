/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('USER_BOOK', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false, type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false, type: Sequelize.DATE,
            },
            userId: {
                type: Sequelize.INTEGER, field: 'user_id', primaryKey: true, references: {
                    model: 'Users', key: 'id',
                     },
                onDelete: 'CASCADE'
            },
            bookId: {
                type: Sequelize.INTEGER, field: 'book_id', primaryKey: true, references: {
                    model: 'Books', key: 'id',
                },
                onDelete: 'CASCADE'
            },
        });

    },

    async down(queryInterface, Sequelize) {

        await queryInterface.dropTable('USER_BOOK');

    }
};
