<script setup>
import { FooterMusicStore } from '@/store/FooterMusic.js'
import { ref, onMounted, watch, onUpdated } from 'vue'
import MusicDetail from './MusicDetail.vue'
const store = FooterMusicStore()

// 定时器
let interVal = ref(0)

/* vue3中this.$ref的使用变化 */
const audio = ref(null)
onMounted(() => {
  // console.log(audio)
  store.getLyric(store.playlist[store
    .playListIndex].id)
})

onUpdated(() => {
  /* 将id传给获取歌词的方法 */
  store.getLyric(store.playlist[store
    .playListIndex].id)
  // 渲染的时候也需要同步歌词时间
  updateTime()
  addDuration()
})

const play = () => {
  /* 判断是否已暂停 */
  if (audio.value.paused) {
    /* 调用audio的播放功能方法 */
    audio.value.play()
    // 让其显示播放按钮
    store.updateIsbtnShow(false)
    // 触发定时器
    updateTime()
  } else {
    /* 调用暂停方法 */
    audio.value.pause()
    // 让其隐藏播放按钮
    store.updateIsbtnShow(true)
    // 清除定时器
    clearInterval(interVal)
  }
}

// 修改歌曲总时长
const addDuration = () => {
  store.udpateDuration(audio.value.duration)
}
// 设置定时器方法来触发更新歌词时间
const updateTime = () => {
  interVal = setInterval(() => { store.udpateCurrentTime(audio.value.currentTime) }, 1000)
}

/* 监听下标，如果下标改变就自动播放音乐 */
watch(() => store.playListIndex, () => {
  audio.value.autoplay = true
  if (audio.value.paused) {
    // 如果是暂停状态，需要改变图标显示
    store.updateIsbtnShow(false)
  }
})

/* 监听数据变化，解决点击第一首可以播放这个bug */
watch(() => store.playlist, () => {
  if (store.isbtnShow) {
    audio.value.autoplay = true
    if (audio.value.paused) {
      // 如果是暂停状态，需要改变图标显示
      store.updateIsbtnShow(false)
    }
  }
})
</script>

<template>
  <div class="FooterMusic">
    <div class="fouterLeft" @click="store.udpateDetailShow">
      <img :src="store.playlist[store.
      playListIndex].al.picUrl">
      <div>
        <p>{{ store.playlist[store.
            playListIndex].name
        }}</p>
        <span>横滑切换上下首</span>
      </div>
    </div>
    <div class="fouterRight">
      <svg class="icon" aria-hidden="true" v-if="store.isbtnShow" @click="play">
        <use xlink:href="#icon-24gl-playCircle"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao1"></use>
      </svg>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${store.playlist[store.
    playListIndex].id}.mp3`"></audio>
    <van-popup v-model:show="store.detailShow" position="bottom" :style="{ height: '100%', width: '100%' }">
      <MusicDetail :musicList="store.playlist[store.
      playListIndex]" :play="play" :isbtnShow="store.isbtnShow" :addDuration="addDuration"></MusicDetail>
    </van-popup>
  </div>
</template>

<style lang='less' scoped>
.FooterMusic {
  width: 100%;
  height: 1.4rem;
  background-color: white;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: .2rem;
  justify-content: space-between;

  .fouterLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }

  .fouterRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      width: .6rem;
      height: .6rem;
    }
  }
}
</style>
