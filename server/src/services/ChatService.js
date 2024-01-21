const GroupMembers = require('../models/GroupMembers')
const Chat = require('../models/Chat')

exports.getPrivateChat = async (userId, receiverId) => {
    const usersChats = await getUsersChats(userId)
    const receiverChats = await getUsersChats(receiverId)
    if(!usersChats || !receiverChats){
        return null
    }
    if(usersChats.length > 0 && receiverChats.length > 0){
      const commonChat = findPrivateChat(usersChats, receiverChats)
      return commonChat
    }
  }

const getUsersChats = async (userIdValue) => {
    try {
      const groupMembers = await GroupMembers.findOne({
        where: {
            userId: userIdValue
        },
        raw: true
      })

      console.log(groupMembers)

      if(!groupMembers){
        return null
      }

      const result = await Chat.findAll({
        where: {
            id: groupMembers.chatId
        }
      })

      console.log(result)
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  
  
const findPrivateChat = (list1, list2) => {
    let commonChat
  
    for (const chat1 of list1) {
      for (const chat2 of list2) {
        if (chat1.id === chat2.id) {
          commonChat = chat1
          break
        }
      }
    }
  
    return commonChat
  }
  