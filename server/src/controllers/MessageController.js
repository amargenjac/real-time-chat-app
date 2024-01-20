const Message = require('../models/Message')
const Chat = require('../models/Chat')

exports.SendMessage = async (req, res) => {
    const chatId = req.query.id
    const messageBody = req.body.messageText
    const senderId = req.body.user.id
    if(!chatId){
        return res.status(400).json({
            status:"Error",
            message:"Bad request"
        })
    }
    try{
        const chat = await Chat.findOne({
            where:{
            id: chatId  
            }
        })

        if(!chat){
            return res.status(400).json({
                status:"Error",
                message:"Bad request"
        })}

        const newMessage = {
            messageText: messageBody,
            senderId: senderId,
            chatId: chatId
        }
        const message = await Message.create(newMessage)
        res.status(200).json({
            status: 'Success',
            message: message
        })
    }catch(err){
        console.error(err)
    }
    
}