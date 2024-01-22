const Message = require('../models/Message')
const { Op } = require('sequelize')
const Chat = require('../models/Chat')
const User = require('../models/User')
const GroupMembers = require('../models/GroupMembers')

exports.CreateGroup = async (req, res) => {
    const groupName = req.body.groupName
    const groupMembers = req.body.groupMembers
    console.log(groupMembers)
    console.log(req.body.user.id)
    groupMembers.push(req.body.user.id)
    let response = {}

    const users = await User.findAll({
        where: {
            id: {
                [Op.in]: groupMembers
            }
        },
        raw: true
    })

    const missingUsers = groupMembers.filter(userId => !users.some(user => user.id === userId));

    const newChatData = {
        name: groupName,
        isGroup: 1
    }

    const chat = await Chat.create(newChatData)
    const newGroupMembersData = []
    users.forEach(user => {
        const member = {
            chatId: chat.id,
            userId: user.id
        }
        newGroupMembersData.push(member)
    })

    const addedGroupMembers = await GroupMembers.bulkCreate(newGroupMembersData)
    response.status = 'Success'
    response.members = addedGroupMembers
    response.chat = chat
    if (missingUsers.length > 0) {
        response.missingUsers = missingUsers
    }

    res.status(200).json(response)

}