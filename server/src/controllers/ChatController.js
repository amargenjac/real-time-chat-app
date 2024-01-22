const Chat = require('../models/Chat')
const GroupMembers = require('../models/GroupMembers')
const Message = require('../models/Message')
const User = require('../models/User')
const { getPrivateChat } = require('../services/ChatService')


exports.CreateChat = async (req, res) => {
    const senderId = req.body.user.id
    const receiverId = req.body.receiverId
    const receiver = await User.findOne({
        where: {
            id: receiverId
        }
    })
    if (senderId == receiverId) {
        return res.status(404).json({
            status: "Error",
            message: "Self messages not supported"
        })
    }
    if (!receiver) {
        return res.status(404).json({
            status: "Error",
            message: "User not found"
        })
    }
    const chat = await getPrivateChat(senderId, receiverId)
    if (!chat) {
        const newChatData = {
            name: 'privateChat',
            isGroup: 0,
        }
        try {
            const newChat = await Chat.create(newChatData)
            const senderData = {
                chatId: newChat.id,
                userId: senderId
            }
            const receiverData = {
                chatId: newChat.id,
                userId: receiverId
            }

            await GroupMembers.bulkCreate([senderData, receiverData])

            const messages = await Message.findAll({
                where: {
                    id: newChat.id
                }
            })
            res.status(200).json({
                status: 'Success',
                chatId: newChat.id,
                messages: messages
            })

        } catch (e) {
            console.error(e)
        }

    } else {
        const messages = await Message.findAll({
            where: {
                chatId: chat.id
            }
        })
        console.log(chat.id)
        res.status(200).json({
            status: 'Success',
            chatId: chat.id,
            messages: messages
        })
    }

}
exports.GetChat = async (req, res) => {
    const chatId = req.query.id
    const senderId = req.body.user.id
    console.log(chatId)
    const chat = await Chat.findOne({
        where: {
            id: chatId
        }
    })
    if (!chat) {
        return res.status(404).json({
            status: 'Error',
            message: 'Chat not found',
        })
    }

    const chatMembers = await GroupMembers.findAll({
        where: {
            chatId: chat.id
        }
    })
    let isMemberValid = false
    chatMembers.forEach(member => {
        if (member.userId == senderId) {
            isMemberValid = true
        }
    });
    if (!isMemberValid) {
        return res.status(404).json({
            status: 'Error',
            message: 'User not part of the chat',
        })
    }
    const messages = await Message.findAll({
        where: {
            chatId: chat.id
        },
        raw: true
    })
    res.status(200).json({
        status: 'Success',
        message: messages
    })

}
