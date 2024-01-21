const User = require('../models/User')
const AuthUtils = require('../utils/authUtils')
const {GetUsers} = require('../services/UserService')

module.exports = { 
    async Register (req, res){
        try{
            let body = req.body
            const hashedPassword = await AuthUtils.encryptPassword(body)
            body.isOnline = 0
            body.password = hashedPassword
            const user = await User.create(body)
            return res.status(200).json({
                status: 'Success',
                message: 'User has been registered'
            })
        } catch (err){
            console.error(err)
            return res.status(400).json({
                status: 'Error',
                message:'Email already exists. Please try another email.'
            })
        }
    },
    async Login (req, res){
        try{
            const {email, password} = req.body
            let user = await User.findOne({
                where: {email: email}
            })
            if(!user){
                return res.status(400).json({
                    status: 'Error',
                    message:'The login information was incorrect'
                })
            }
            const isValid = await AuthUtils.isPasswordValid(password, user.password)
            if(!isValid){
                return res.status(400).json({
                    status: 'Error',
                    message:'The login information was incorrect'
                })
            }
            await User.update({isOnline: true}, {
                where: {
                    id: user.id
                }
            })

            user = await User.findOne({
                where: {email: email}
            })

            const users = await GetUsers(user.id)

            delete user.dataValues.password
            const token = AuthUtils.jwtSignUser(user)
            return res.status(200).json({
                status: 'Success',
                token: token,
                users: users
                })
        } catch(err){
            console.error(err)
           return res.status(500).json({
            status: 'Error',
            message: 'Something went wrong'
           })
        }
        }
}