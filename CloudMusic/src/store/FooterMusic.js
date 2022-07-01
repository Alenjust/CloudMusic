import { getMusicLyric } from '@/api/itemApi'
import { getPhoneLogin } from '@/api/homeApi.js'
import { defineStore } from 'pinia'

export const FooterMusicStore = defineStore('musicstore', {
  state: () => {
    return {
      playlist: [{ // 播放列表
        al: {
          id: 78925974,
          name: '阳阳的弹唱第四弹',
          pic: 109951165420065220,
          picUrl: 'https://p2.music.126.net/Sh6INWkPpqJL9ODI4-NcqA==/109951165420065213.jpg',
          pic_str: '109951165420065213'
        },
        id: 1363593434,
        ar: [{
          name: '陈阳'
        }],
        name: '阳阳的弹唱第四弹'
      }],
      playListIndex: 0, // 默认下标为0
      isbtnShow: true, // 暂停按钮的显示
      detailShow: false, // 歌曲详情页的显示
      lyricList: {}, // 歌词
      currentTime: 0, // 当前时间
      duration: 0, // 歌曲总时长
      isLogin: false, // 登录状态
      isFooterMusic: true, // 判断底部组件是否显示
      token: '', // 接收后台返回的token字段
      user: {}// 用户信息
    }
  },

  getters: {

  },
  actions: {
    // 修改暂停按钮的显示
    updateIsbtnShow (value) {
      this.isbtnShow = value
    },
    // 修改歌曲信息
    updatePlayList (value) {
      this.playlist = value
      console.log(this.playlist)
    },
    // 修改歌曲数组索引精确到哪首歌去
    updateplayListIndex (value) {
      this.playListIndex = value
    },
    // 修改歌曲详情页的显示
    udpateDetailShow () {
      this.detailShow = !this.detailShow
    },
    // 获取歌词的异步方法
    async getLyric (value) {
      const res = await getMusicLyric(value)
      console.log(res)
      this.udpateLyric(res.data.lrc)
    },
    // 修改歌词
    udpateLyric (value) {
      this.lyricList = value
    },
    // 修改歌词当前时间
    udpateCurrentTime (value) {
      this.currentTime = value
      // console.log(this.currentTime)
    },
    // 修改歌曲总时长
    udpateDuration (value) {
      this.duration = value
    },
    // 搜索出来的歌曲，点击播放，将整首歌数据追加到播放列表内
    pushPlayList (value) {
      this.playlist.push(value)
    },
    // 登录请求
    async getLogin (value) {
      const res = await getPhoneLogin(value)
      console.log('登录返回的数据：', res)
      return res
    },
    // 更新登录状态
    udpateIsLogin (value) {
      this.isLogin = value
    },
    // 更新token字段
    updateToken (value) {
      this.token = value
      localStorage.setItem('token', this.token)
    },
    // 更新用户信息
    updateUser (value) {
      this.user = value
      localStorage.setItem('mydata', JSON.stringify(this.user))
    }
  }

})
