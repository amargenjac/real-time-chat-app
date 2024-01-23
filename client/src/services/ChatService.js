import Api from '@/services/Api'
import qs from 'qs'

const ChatService = {
    getChatMessages (token, params) {
        return Api().get('chat', {
            params: { id: params },
            paramsSerializer: (params) => qs.stringify(params.id, { encode: false }),
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },
    sendMessage (token, params, body) {
        return Api().post('chat', body, {
            params: { id: params },
            paramsSerializer: (params) => qs.stringify(params.id, { encode: false }),
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    },

    startChatWithUser (token, body) {
        return Api().put('create-chat', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}
export default ChatService
