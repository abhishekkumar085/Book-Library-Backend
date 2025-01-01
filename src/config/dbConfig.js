const { Sequelize } = require('sequelize');
const {
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = require('./serverConfig.js');

const sequelize = new Sequelize(
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);

try {
  console.log("Initializing database...");
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}



module.exports = sequelize;
