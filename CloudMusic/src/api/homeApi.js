import service from '@/utils/request.js'

/* 获取首页轮播图数据 */
/* 第一种写法
 export function getBanner () {
  return service({
    method: 'GET',
    url: '/banner?type=2'
  })
} */
// 第二种写法
export function getBanner (type) {
  return service.get('/banner', {
    /* 请求参数 */
    params: {
      type
    }
  })
}

/* 获取发现好歌单 */
export function getMusicList () {
  return service({
    method: 'GET',
    url: '/personalized?limit=10'
  })
}

/* 搜索/search?keywords=海阔天空 */
export function getSearchMusic (data) {
  return service({
    method: 'GET',
    url: `/search?keywords=${data}`
  })
}

// 登录/login/cellphone?phone=xxx&password=yyy
export function getPhoneLogin (data) {
  return service({
    method: 'GET',
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
  })
}

// 获取用户详情/user/detail?uid=32953014
export function getLoginUser (data) {
  return service({
    method: 'GET',
    url: `/user/detail?uid=${data}`
  })
}
