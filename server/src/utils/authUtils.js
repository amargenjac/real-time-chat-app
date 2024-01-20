const jwt = require('jsonwebtoken')
const config = require('../config/config')
const bcrypt = require('bcrypt')


module.exports = {
     jwtSignUser(user){
        return jwt.sign({ user: user }, config.jwtSecret, {
            expiresIn: '24h',
        })
    },
    encryptPassword(body){
        return bcrypt.hash(body.password, 12)
    },
    isPasswordValid(password, hashedPassword){
        return bcrypt.compare(password, hashedPassword)
    }
}