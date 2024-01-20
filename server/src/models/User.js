const Sequelize = require('sequelize')
const { Op } = require("sequelize")
const sequelize = require('../utils/database')


const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isOnline: {
        type: Sequelize.TINYINT,
        allowNull: false,
      }
  })

module.exports = User

module.exports.GetUsers = async (id) => {
  const users = await User.findAll({
   attributes: ['id', 'username', 'isOnline'],
    where: {
      id: {
        [Op.ne]: id
      }
    }
  })
  return users
}