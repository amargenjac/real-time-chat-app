<template>
    <v-layout class="rounded rounded-md">
        <v-app-bar>
            <v-btn variant="tonal" class="app-button">Create Group</v-btn>
            <v-btn variant="tonal" class="app-button">New Conversation</v-btn>
        </v-app-bar>

        <v-navigation-drawer>
            <h3 class="chat-text">Chats</h3>
            <v-list>
                <v-list-item v-for="(chat, index) in chats" :key="chat.name" @click="openChat(chat)">
                    <v-list-item-content>
                        <v-btn variant="tonal" class="chat-card">
                            <v-list-item-title>{{ chat.name }}</v-list-item-title>
                        </v-btn>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-main class="d-flex align-center justify-center" style="min-height:max-content;">
        </v-main>
    </v-layout>
</template>

<script>
import UserService from '../services/UserService'
import ChatView from './Chat.vue'
export default {
    name: 'HomeView',
    components: {
        ChatView,
    },
    data () {
        return {
            chats: null,
            isChatOpen: false
        }
    },

    async mounted () {
        const response = await UserService.getUserChats(this.$store.state.token)
        console.log(response.data.userChats)
        this.chats = response.data.userChats
        console.log(this.chats)
    },

    methods: {
        openChat (chat) {
            console.log('in function')
            console.log(chat)
            this.$router.push({ name: 'HomeView', query: { id: chat.id } })
        }
    }
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
