/** @type {import('sequelize-cli').Migration} */
module.exports = {

        up: async (queryInterface, Sequelize) => {
            await queryInterface.addColumn('Users', 'password', {
                type: Sequelize.STRING,
                allowNull: false
            });
        },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Users', 'password');
    }
};
