const User = require('../models/User')
const { Op } = require('sequelize')

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