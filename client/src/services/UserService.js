import Api from '@/services/Api'

const UserService = {
    getUserChats (token) {
        return Api().get('user-chats', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
}
export default UserService
