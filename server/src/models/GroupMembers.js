const Sequelize = require('sequelize')
const sequelize = require('../utils/database')


const GroupMembers = sequelize.define('groupMembers', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
  })

module.exports = GroupMembers