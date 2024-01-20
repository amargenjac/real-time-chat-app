const express = require('express')
const {ValidateToken} = require('../middleware/checkAuthLogin')
const { CreateGroup } = require('../controllers/GroupController')


const router = new express.Router()

router.post('/create-group', ValidateToken, CreateGroup)

module.exports = router