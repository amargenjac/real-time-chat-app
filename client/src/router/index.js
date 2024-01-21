import Register from '../components/Register'
import Login from '../components/Login'

const routes = [
    {
        path: '/register',
        name: 'RegisterView',
        component: Register
    },
    {
        path: '/login',
        name: 'LoginView',
        component: Login
    },
]

export default routes