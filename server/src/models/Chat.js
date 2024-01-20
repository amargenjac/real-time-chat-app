const Sequelize = require('sequelize')
const sequelize = require('../utils/database')


const Chat = sequelize.define('chat', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
    },
    is_group: {
      type: Sequelize.TINYINT,
      allowNull: false,
    }
  })

module.exports = Chat
