const User = require('../models/User')
const AuthUtils = require('../utils/authUtils')

module.exports = { 
    async register (req, res){
        try{
            let body = req.body
            const hashedPassword = await AuthUtils.encryptPassword(body)
            body.is_online = 0
            body.password = hashedPassword
            const user = await User.create(body)
            res.send({
                success: 'Success!'
            })
        } catch (err){
            console.error(err)
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
            const isValid = await AuthUtils.isPasswordValid(password, user.password)
            if(!isValid){
                return res.status(400).send({
                    error:'The login information was incorrect'
                })
            }
            await User.update({is_online: 1}, {
                where: {
                    id: user.id
                }
            })

            user = await User.findOne({
                where: {email: email}
            })

            const users = await User.GetUsers(user.id)

            delete user.dataValues.password
            const token = AuthUtils.jwtSignUser(user)
            return res.send({
                token: token,
                user: user,
                users: users
                })
        } catch(err){
            console.error(err)
           return res.status(500).send({
            err
           })
        }
    }
}