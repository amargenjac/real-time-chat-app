const Sequelize = require('sequelize')
const sequelize = require('../utils/database')


const Message = sequelize.define('message', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    messageText: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    senderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  })

module.exports = Message