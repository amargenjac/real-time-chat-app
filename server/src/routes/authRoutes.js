const express = require('express')
const authController = require('../controllers/AuthController')
const AuthControllerPolicy = require('../policies/AuthControllerPolicy')

const router = express.Router()

router.post('/register', AuthControllerPolicy.register, authController.register)
router.post('/login', authController.login)

module.exports = router
