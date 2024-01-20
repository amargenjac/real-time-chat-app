const GroupMembers = require('../models/GroupMembers')

module.exports = { 
    async GetUserGroups (req, res){
       const userId = req.body.user.id
       const userChats = await GroupMembers.findAll({
        where:{
            userId: userId
        },
        attributes: ['chatId', 'updatedAt']
       })

       res.status(200).json({
        status: 'Success',
        userChats: userChats
       })
    },


}