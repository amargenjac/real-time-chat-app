<template>
    <div class="register">
        <h1>Register</h1>
        <br>
        <v-text-field label="Email" variant="solo-filled" v-model="email"></v-text-field>
        <br />
        <v-text-field label="Username" variant="solo-filled" v-model="username"></v-text-field>
        <br />
        <v-text-field label="Password" variant="solo-filled" type="password" v-model="password"></v-text-field>
        <br />
        <v-col cols="auto">
            <v-btn elevation="4" size="x-large" @click="register">Sign Up</v-btn>
        </v-col>
        <h4>Or</h4>
        <v-col cols="auto">
            <v-btn elevation="4" size="x-large" @click="redirectToLogin">Sign in</v-btn>
        </v-col>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
    </div>
</template>
  
<script>
import AuthService from '../services/AuthService'
export default {
    name: 'RegisterView',
    data () {
        return {
            email: '',
            username: '',
            password: '',
            error: null
        }
    },
    methods: {
        async register () {
            try {
                const response = await AuthService.register({
                    email: this.email,
                    username: this.username,
                    password: this.password
                })
                console.log(response.data)
            } catch (e) {
                this.error = e.response.data.error
            }
        },
        redirectToLogin () {
            this.$router.push("/login")
        }
    }
}
</script>
  
<style scoped>
.register {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
}

h1 {
    text-align: center;
    color: #333;
}

.input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
}

button {
    width: 100%;
    padding: 10px;
    background-color: lightseagreen;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.danger-alert {
    color: red
}
</style>
  