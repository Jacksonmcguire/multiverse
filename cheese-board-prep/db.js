const path = require('path');
const { Sequelize, Model } = require('sequelize');

// TODO - create the new sequelize connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    // storage: path.join(__dirname, 'db.js')
})
module.exports = {
    sequelize,
    Sequelize,
};