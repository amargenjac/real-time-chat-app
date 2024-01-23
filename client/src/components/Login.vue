<template>
  <v-layout class="rounded rounded-md">
    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <div class="login">
        <h1>Login</h1>
        <br>
        <v-text-field label="Email" variant="solo-filled" v-model="email"></v-text-field>
        <br />
        <v-text-field label="Password" variant="solo-filled" type="password" v-model="password"></v-text-field>
        <br />
        <v-col cols="auto">
          <v-btn elevation="4" size="x-large" @click="login">Sign in</v-btn>
        </v-col>
        <h4>Or</h4>
        <v-col cols="auto">
          <v-btn elevation="4" size="x-large" @click="redirectToRegister">Sign Up</v-btn>
        </v-col>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
import AuthService from '../services/AuthService'
export default {
  name: 'LoginView',
  components: {
  },
  data () {
    return {
      email: '',
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password
        })
        console.log(response)
        const token = response.data.token
        const user = response.data.user
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        let users = response.data.users
        this.$router.push({
          name: 'HomeView',
          params: { users }
        })
      } catch (e) {
        this.error = e.response.data.message
        console.error(e)
      }
    },
    redirectToRegister () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 500px;
  min-width: 400px;
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
