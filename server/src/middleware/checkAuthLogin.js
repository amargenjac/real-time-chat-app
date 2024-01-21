const jwt = require('jsonwebtoken');
const Config = require('../config/config')  
const User = require('../models/User')
exports.ValidateToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, Config.jwtSecret)


        const user = await User.findOne({
            where:{
                id: decoded.user.id
            }
        })

        if(!user){
            return res.status(401).send({
                status:'Error',
                message:'Not authorized'
            })
        }

        req.body.user = user
                next()
    } catch (e) {
        return res.status(401).send({
            status:'Error',
            message:'Authorization problem'
        })
    }
};