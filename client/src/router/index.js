import Register from '../components/Register'
import Login from '../components/Login'
import Home from '../components/Home'

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
    {
        path: '/home',
        name: 'HomeView',
        component: Home
    },
]

export default routes