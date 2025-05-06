const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/dbConfig.js');

const User = db.define(
  'users',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

module.exports = User;

User.prototype.ValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
