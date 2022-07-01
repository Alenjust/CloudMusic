// 封装axios请求
import axios from 'axios'
const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 3000
})
// 导出axios方法
export default service
