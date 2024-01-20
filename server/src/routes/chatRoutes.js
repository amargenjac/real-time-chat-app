const express = require('express')
const {
    getChat
} = require('../controllers/ChatController')
const {validateToken} = require('../middleware/checkAuthLogin')

const router = new express.Router()

router.get('/get-chat', validateToken, getChat)

module.exports = router