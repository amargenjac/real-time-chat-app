<template>
  <div class="register">
    <h1>Register</h1>
    <input type="text" id="email" placeholder="Email" v-model="email" />
    <br />
    <input type="username" id="username" placeholder="Username" v-model="username" />
    <br />
    <input type="password" id="password" placeholder="Password" v-model="password" />
    <br />
    <button id="register" @click="register">Register</button>
  </div>
</template>

<script>
import AuthService from '../services/AuthService'
export default {
  name: 'register',
  data () {
    return {
      email: '',
      username: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await AuthService.register({
        email: this.email,
        username: this.username,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>
