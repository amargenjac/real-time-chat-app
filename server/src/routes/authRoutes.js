const express = require('express')
const authController = require('../controllers/AuthController')
const AuthControllerPolicy = require('../policies/AuthControllerPolicy')

const router = express.Router()

router.post('/register', AuthControllerPolicy.register, authController.Register)
router.post('/login', authController.Login)

module.exports = router
