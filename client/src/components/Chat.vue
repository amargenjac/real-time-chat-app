<template>
    <div class="wrapper">
        <v-list>
            <div class="message-wrapper">
                <v-list-item class="list-messages" v-for="(message, index) in userChat" :key="index"
                    :title="message.senderUsername" :subtitle="message.messageText" />
            </div>
            <br>
        </v-list>
        <div class="input-wrapper" v-if="messages">
            <v-textarea class="input-box" label="New message" variant="outlined" v-model="textMessage"></v-textarea>
            <v-btn variant="outlined" @click="sendMessage">
                Send
            </v-btn>
        </div>
    </div>
</template>

<script>
import ChatService from '@/services/ChatService'
import { socket, state } from '@/socket'


export default {
    name: 'ChatView',
    data () {
        return {
            userChat: state.UserChats.find(userChat => userChat.chatId == this.$route.query.id).messages
        }
    },
    components: {
    },
    props: [
    ],
    methods: {
        async sendMessage () {
            try {
                const body = {
                    messageText: this.textMessage
                }
                const params = {
                    id: this.$route.query.id
                }
                await ChatService.sendMessage(localStorage.getItem('token'), params, body)

                socket.emit("new message", {
                    content: this.textMessage,
                    to: this.$route.query.id,
                });

            } catch (e) {
                console.error(e)
            }
        }
    },
    mounted () {
    }
}



</script>

<style scoped>
.input-box {
    justify-content: center;
    max-width: 500px;
}

.input-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
}

.list-messages {
    text-align: left;
}

.wrapper {
    min-width: 100%;
}

.message-wrapper {
    background-color: gray;
    max-width: fit-content;
    margin-top: 20px;
    margin-left: 20px;
}
</style>