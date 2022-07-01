import { Swipe, SwipeItem, NavBar, Button, Search, Popup } from 'vant'
/* 放入数组中 */
const plugins = [
  Swipe, NavBar, SwipeItem, Button, Popup, Search
]

/* 循环将每一个插件注册到app上，main.js直接调用这个方法即可 */
export default function getVant (app) {
  plugins.forEach((item) => {
    return app.use(item)
  })
}
