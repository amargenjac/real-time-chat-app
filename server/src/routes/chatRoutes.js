const express = require('express')
const {
    getChat
} = require('../controllers/ChatController')
const Middleware = require('../middleware/checkAuthLogin')

const router = new express.Router()

router.get('/get-chat', Middleware.validateToken, getChat)

module.exports = router