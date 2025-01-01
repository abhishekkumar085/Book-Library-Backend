const dotenv = require('dotenv');
dotenv.config();

const DATABASE_NAME=process.env.DATABASE_NAME;

const DATABASE_USERNAME=process.env.DATABASE_USER;

const DATABASE_PASSWORD=process.env.DATABASE_PASSWORD;

module.exports={
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
}