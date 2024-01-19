import Api from '@/services/Api'

const AuthService = {
  register (creds) {
    return Api().post('register', creds)
  }
}
export default AuthService
