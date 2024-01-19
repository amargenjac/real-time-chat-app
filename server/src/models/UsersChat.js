const Sequelize = require('sequelize')
const sequelize = require('../utils/database')


const UserChat = sequelize.define('user_chat', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
  })

module.exports = UserChat