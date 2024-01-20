const Sequelize = require('sequelize')
const sequelize = require('../utils/database')
const GroupMembers = require('./GroupMembers')


const Chat = sequelize.define('chat', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
    name: {
      type: Sequelize.STRING,
    },
    isGroup: {
      type: Sequelize.TINYINT,
      allowNull: false,
    }
  })


module.exports = Chat