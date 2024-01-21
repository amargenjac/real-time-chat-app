const Chat = require('../models/Chat')
const GroupMembers = require('../models/GroupMembers')
const { Op } = require('sequelize')

module.exports = {
    async GetUserGroups (req, res) {
        const userId = req.body.user.id
        const userChats = await GroupMembers.findAll({
            where: {
                userId: userId
            },
            attributes: ['chatId'],
            raw: true
        })
        console.log(userChats)
        const chatIds = userChats.map(chat => chat.chatId);
        const chats = await Chat.findAll({
            where: {
                id: {
                    [Op.in]: chatIds
                }
            },
            attributes: ['id', 'name']
        })

        res.status(200).json({
            status: 'Success',
            userChats: chats
        })
    },


}