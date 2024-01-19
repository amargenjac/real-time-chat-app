const User = require('../models/User')
const jwt = require('jsonwebtoken');
const config = require('../config/config')

module.exports = { 
    async register (req, res){
        try{
            let body = req.body
            body.is_online = 0
            const user = await User.create(body)
            res.send(user.toJSON())
        } catch (err){
            res.status(400).send({
                error: 'Email already exists. Please try another email.'
            })
        }
    },
    async login (req, res){
        try{
            const {email, password} = req.body
            let user = await User.findOne({
                where: {email: email}
            })
            if(!user){
                return res.status(400).send({
                    error:'The login information was incorrect'
                })
            }
            const isPasswordValid = password === user.password
            if(!isPasswordValid){
                return res.status(400).send({
                    error:'The login information was incorrect'
                })
            }
            await User.update({is_online: 1}, {
                where: {
                    id: user.id
                }
            })
            const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
                expiresIn: '1h',
                });
            return res.send({ token })
        } catch(err){
           return res.status(500).send({
            err
           })
        }
    }
}