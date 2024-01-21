import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(vuetify).use(router).mount('#app')
