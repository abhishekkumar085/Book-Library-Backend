const { sequelize, DataTypes } = require('sequelize');
const db = require('../Config/dbConfig.js');

const Book = db.define('books', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
  },
});

module.exports=Book;
