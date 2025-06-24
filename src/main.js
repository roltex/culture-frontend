import { createApp } from 'vue'
import App from '@/App.vue'
import router from './router'
import VueQuery from './plugins/vue-query'
import i18n from './i18n'
import './style.css'


const app = createApp(App)
app.use(router)
app.use(VueQuery)
app.use(i18n)
app.mount('#app')
