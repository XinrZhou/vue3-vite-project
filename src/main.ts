import { createApp} from 'vue'
import App from './App.vue'
//Element-UI
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入ponia
import { createPinia } from 'pinia'
//引入路由
import router from './router'

const app = createApp(App)
const state = createPinia()

//使用插件
app.use(router)
app.use(state)
app.use(ElementPlus)

app.mount('#app')


