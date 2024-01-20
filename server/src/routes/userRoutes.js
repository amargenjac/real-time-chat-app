const express = require('express')
const {ValidateToken} = require('../middleware/checkAuthLogin')
const { GetUserGroups } = require('../controllers/UserController')


const router = new express.Router()

router.get('/user-chats', ValidateToken, GetUserGroups)

module.exports = router