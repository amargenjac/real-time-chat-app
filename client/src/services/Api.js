import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://hulkapps-chatapp-0b039a154f89.herokuapp.com/'
  })
}
