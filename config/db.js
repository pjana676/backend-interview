const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const { DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL);

module.exports = sequelize;