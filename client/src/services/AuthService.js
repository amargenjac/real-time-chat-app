import Api from '@/services/Api'

const AuthService = {
  register (creds) {
    return Api().post('register', creds)
  },
  login (creds) {
    return Api().post('login', creds)
  }
}
export default AuthService
