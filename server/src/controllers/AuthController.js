const User = require('../models/User')

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
    }
}