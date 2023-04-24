const express = require('express')
const app = express()
const port = 3000

const Sequelize = require('sequelize');
const sequelize = new Sequelize('JS_EXPRESS', 'postgres', 'antoni', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

app.get('/test12', (req, res) => {
    testConnection()
    res.send('public static void main(String[] args)')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})