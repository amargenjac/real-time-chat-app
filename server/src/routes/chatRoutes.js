const express = require('express')
const {ValidateToken} = require('../middleware/checkAuthLogin')
const {ValidateMessage} = require('../policies/MessageControllerPolicy')
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
router.post('/chat', ValidateToken, ValidateMessage, SendMessage)

module.exports = router