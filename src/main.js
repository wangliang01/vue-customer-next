import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入rem
import './utils/rem'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(Vant)
app.mount('#app')
