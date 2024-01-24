import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    connected: false,
    connectedUsers: [],
    user: null,
    UserChats: [{
        chatId: null,
        messages: []
    }]
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://hulkapps-chatapp-0b039a154f89.herokuapp.com/";

export const socket = io(URL);

socket.on('connect', () => {
    state.connected = true;
});

socket.on('users', (users) => {
    users.forEach((user) => {
        state.user = user
    });
    // put the current user first, and then sort by username
    state.connectedUsers = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
    })
})

socket.on('disconnect', () => {
    state.connectedUsers.filter(user => user == state.user)
})

socket.on('user connected', (user) => {
    state.connectedUsers.forEach((element) => {
        if (user.username == element.username) return;
    }
    );
    state.connectedUsers.push(user);
});

socket.on('new message', (content, from, to) => {
    let userChatIndex = state.UserChats.findIndex(userChat => userChat.chatId == to)
    if (userChatIndex != -1) {
        const message = {
            content: content,
            senderUsername: from
        }
        state.UserChats[userChatIndex].messages.push(message)
    }
})