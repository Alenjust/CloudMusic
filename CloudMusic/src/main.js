import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// import { Swipe, SwipeItem } from 'vant'

/* 引入插件 */
import getVant from './plugins'
const app = createApp(App)
getVant(app)

/* app.use(Swipe)
app.use(SwipeItem) */

app.use(router).use(createPinia()).mount('#app')
