<template>
    <div class="wrapper">
        <v-list>
            <div class="message-wrapper">
                <v-list-item class="list-messages" v-for="(message, index) in messages" :key="index"
                    :title="message.senderId" :subtitle="message.messageText" />
            </div>
            <br>
        </v-list>
    </div>
</template>

<script>

export default {
    name: 'ChatView',
    components: {
    },
    props: [
        'messages',
    ],
    methods: {
        testMessage () {

        }
    },
    mounted () {
    }
}



</script>

<style scoped>
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