const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Config = require('../config/config')  

const validateToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, Config.jwtSecret)

        console.log(decoded)

        req.body.user = decoded.user
        next()
    } catch (e) {
        res.status(401).send({error: 'Authentication problem!!'})
    }
};

module.exports = {validateToken};