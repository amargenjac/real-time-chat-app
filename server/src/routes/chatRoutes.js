const express = require('express')
const {
    CreateChat,
    GetChat
} = require('../controllers/ChatController')
const {validateToken} = require('../middleware/checkAuthLogin')

const router = new express.Router()

router.put('/create-chat', validateToken, CreateChat)
router.get('/chat', validateToken, GetChat)

module.exports = router