const Chat = require('../models/Chat')
const GroupMembers = require('../models/GroupMembers')
const Message = require('../models/Message')
const User = require('../models/User')
const {getPrivateChat} = require('../services/ChatService')


exports.getChat = async (req, res) => {
        const senderId = req.body.user.id
        const receiverId = req.query.id
        const receiver = await User.findOne({
            where:{
                id: receiverId
            }
        })
        console.log(receiver)
        if(!receiver){
            return res.status(404).json({
                status: "Error",
                message: "User not found"
            })
        }
        const chat = await getPrivateChat(senderId, receiverId)
        if (!chat){
            const newChatData = {
                name: 'privateChat',
                isGroup: 0,
            }
            try{
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
                    where:{
                        id: newChat.id
                    }
                })
                res.status(200).json({
                    status: 'Success',
                    chatId: newChat.id,
                    messages: messages
                })

            } catch(e) {
                console.error(e)
            }
            
        } else{
            const messages = await Message.findAll({
                where:{
                    id: chat.id
                }
            })
            res.status(200).json({
                status: 'Success',
                chatId: chat.id,
                messages: messages
            })
        }

    }
