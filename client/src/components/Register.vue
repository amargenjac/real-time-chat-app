<template>
  <div class="register">
    <h1>Register</h1>
    <input type="text" class="input" placeholder="Email" v-model="email" />
    <br />
    <input type="username" class="input" placeholder="Username" v-model="username" />
    <br />
    <input type="password" class="input" placeholder="Password" v-model="password" />
    <br />
    <button id="register" @click="register">Register</button>
    <br>
    <div class="danger-alert" v-html="error" />
    <br>
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
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
