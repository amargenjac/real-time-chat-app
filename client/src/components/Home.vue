<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar color="surface-variant" title="Application bar"></v-app-bar>

        <v-navigation-drawer>
            <v-list>
                <v-list-item title="Online"></v-list-item>
                <v-list-item v-for="(user, index) in connectedUsers" :key="index"
                    @click="startChatWithConnectedUser(user.userId)">
                    <v-list-item-content>
                        <v-btn variant="tonal" class="chat-card">
                            <v-list-item-title>{{ user.username }}</v-list-item-title>
                        </v-btn>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-navigation-drawer location="right">
            <v-list>
                <v-list-item title="Chats"></v-list-item>
                <v-list-item v-for="(chat, index) in chats" :key="index" @click="openChat(chat)">
                    <v-list-item-content>
                        <v-btn variant="tonal" class="chat-card">
                            <v-list-item-title>{{ chat.name }}</v-list-item-title>
                        </v-btn>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main class="d-flex align-center justify-center" style="min-height:max-content;">
            <ChatView :messages="messagesList"></ChatView>
        </v-main>
    </v-layout>
</template>



<script>
import UserService from '../services/UserService'
import ChatView from './Chat.vue'
import ChatService from '../services/ChatService'
import { state, socket } from "@/socket"
export default {
    name: 'HomeView',
    components: {
        ChatView,
    },
    data () {
        return {
            chats: null,
            isChatOpen: false,
            messagesList: [],
            onlineUsers: []
        }
    },
    async mounted () {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const username = user.username
            const userId = user.id
            socket.auth = { username, userId }
            socket.connect()
            const response = await UserService.getUserChats(localStorage.getItem('token'))
            this.chats = response.data.userChats
        } catch (e) {
            console.error(e)
        }
    },

    methods: {
        async openChat (chat) {
            this.$router.push({ name: 'HomeView', query: { id: chat.id } })
            const params = {
                id: chat.id
            }
            const response = await ChatService.getChatMessages(localStorage.getItem('token'), params)
            this.messagesList = response.data.message
            this.isChatOpen = true
        },
        async startChatWithConnectedUser (userId) {
            try {
                console.log(userId)
                const response = await ChatService.startChatWithUser(localStorage.getItem('token'), { receiverId: userId })
                if (response.data.status == 'Success') {
                    this.$router.push({ name: 'HomeView', query: { id: response.data.chatId } })
                    this.messagesList = response.data.messages
                }
            } catch (err) {
                console.error(err)
            }
        }
    },

    computed: {
        connectedUsers () {
            const filterUniqueUsernames = (arr) => {
                const uniqueUsernames = new Set();
                return arr.filter(obj => {
                    if (!uniqueUsernames.has(obj.username)) {
                        uniqueUsernames.add(obj);
                        return true;
                    }
                    return false;
                });
            };
            return filterUniqueUsernames(state.connectedUsers)
        }
    },
}
</script>

<style scoped>
.chat-card {
    background-color: lightseagreen;
    width: 100%;
}

.app-button {
    margin-right: 10px;
}

.chat-text {
    margin-top: 10px;
}
</style>
