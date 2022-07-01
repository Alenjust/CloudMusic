// 设置导出请求函数
import service from '@/utils/request.js'
/* 获取歌单详情页的数据 */
export function getMusicItem (data) {
  return service({
    method: 'GET',
    /* 这里用到模板字符串，将data参数传进来 */
    url: `/playlist/detail?id=${data}`
  })
}

/* export function getMusicItem(data){
  return service.get('/playlist/detail',{
    params:{
      id:data
    }
  })
} */

/* 获取歌单歌曲的数据 */
export function getMusicItemList (data) {
  return service({
    method: 'GET',
    /* 这里用到模板字符串，将data参数传进来 */
    url: `/playlist/track/all?id=${data}&limit=100&offset=0`
  })
}

// 获取歌曲歌词/lyric?id=33894312
export function getMusicLyric (data) {
  return service({
    method: 'GET',
    /* 这里用到模板字符串，将data参数传进来 */
    url: `/lyric?id=${data}`
  })
}
