import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/reset.scss'
import './styles/iconfont.scss'
import './styles/global.scss'
// 引入rem
import './utils/rem'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
import GlobalComponent from './components'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(Vant)
// 注册全局组件
app.use(GlobalComponent)
app.mount('#app')
