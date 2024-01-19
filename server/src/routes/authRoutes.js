const express = require('express')
const authController = require('../controllers/AuthController')
const AuthControllerPolicy = require('../policies/AuthControllerPolicy')

const router = express.Router()

router.post('/register', AuthControllerPolicy.register, authController.register)

module.exports = router
