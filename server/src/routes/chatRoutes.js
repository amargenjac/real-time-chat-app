const express = require('express')
const rateLimit = require('express-rate-limit')
const { ValidateToken } = require('../middleware/checkAuthLogin')
const { ValidateMessage } = require('../policies/MessageControllerPolicy')
const {
    CreateChat,
    GetChat
} = require('../controllers/ChatController')
const {
    SendMessage,
} = require('../controllers/MessageController')

const router = new express.Router()

router.put('/create-chat', ValidateToken, CreateChat)
router.get('/chat', ValidateToken, GetChat)
router.post('/chat', rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 30
}), ValidateToken, ValidateMessage, SendMessage)

module.exports = router