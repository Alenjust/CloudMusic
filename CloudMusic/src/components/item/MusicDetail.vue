<script setup>
import { computed, defineProps, onMounted, ref, watch } from 'vue'
import { Vue3Marquee } from 'vue3-marquee'
import { FooterMusicStore } from '@/store/FooterMusic.js'
import 'vue3-marquee/dist/style.css'
const store = FooterMusicStore()
const props = defineProps(['musicList', 'isbtnShow', 'play', 'addDuration'])
const isLyricShow = ref(false)
console.log(props)

// 计算属性歌词处理
const lyric = computed(() => {
  let arr
  if (store.lyricList.lyric) {
    /* 将歌词进行换行符分割 */
    /* 1.先用数组split方法对歌词的换行进行分割
    2.用map方法，遍历数组并对其进行操作返回一个新数组
    3.以对象形式返回为新数组
    */
    arr = store.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
      // 分钟，切割第一到第三
      const min = item.slice(1, 3)
      // 秒钟切割
      const sec = item.slice(4, 6)
      // 毫秒切割
      let mill = item.slice(7, 10)
      // 歌词切割
      let lrc = item.slice(11, item.length)
      // 每句歌词显示的时间
      let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
      // 因为两句歌词后面的毫秒为两位数，则要进行处理
      if (isNaN(Number(mill))) {
        mill = item.slice(7, 9)
        lrc = item.slice(10, item.length)
        time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
      }
      // console.log(min, sec, Number(mill), lrc)
      // 返回对象组成数组
      return { min, sec, mill, lrc, time }
    })
    // 遍历拿到pre，即后一句歌词的时间
    arr.forEach((item, i) => {
      if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
        item.pre = 100000
      } else {
        item.pre = arr[i + 1].time
      }
    })
  }
  return arr
}
)

onMounted(() => {
  props.addDuration()
  // console.log(props)
})

// this.$refs的vue3写法
const musicLyric = ref(null)
// 监听歌词时间
watch(() => store.currentTime, (newValue) => {
  const p = document.querySelector('p.active')
  // console.log([p])
  if (p) {
    if (p.offsetTop > 300) {
      musicLyric.value.scrollTop = p.offsetTop - 300
    }
  }
  // console.log([musicLyric.value])
  if (newValue === store.duration) {
    if (store.playListIndex === store.playlist.length - 1) {
      store.updateplayListIndex(0)
      props.play()
    } else {
      store.updateplayListIndex(store.playListIndex + 1)
    }
  }
})

// 返回操作
const backHome = () => {
  store.udpateDetailShow()
  isLyricShow.value = false
}

// 下一首上一首操作
const goPlay = (num) => {
  let index = store.playListIndex + num
  if (index < 0) {
    index = store.playlist.length - 1
  } else if (index === store.playlist.length) {
    index = 0
  }
  store.updateplayListIndex(index)
}

</script>

<template>
  <!-- 背景图虚化 -->
  <img :src="musicList.al.picUrl" class="bgimg">
  <!-- 头部 -->
  <div class="top">
    <div class="left">
      <svg class="icon" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="mleft">
        <!-- 走马灯 -->
        <Vue3Marquee>
          {{ musicList.name }}
        </Vue3Marquee>
        <span v-for="item in musicList.ar" :key="item">{{ item.name }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youjiantou1"></use>
        </svg>
      </div>
    </div>
    <div class="right">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <!-- 磁盘 -->
  <div class="content" v-show="!isLyricShow">
    <img src="@/assets/zhen.png" class="needle" :class="{ needle_active: !isbtnShow }">
    <img src="@/assets/cd.png" class="cd">
    <img :src="musicList.al.picUrl" class="ar" @click="isLyricShow=true"  :class="{ ar_active: !isbtnShow, ar_paused: isbtnShow }">
  </div>
  <!-- 歌词 -->
  <div class="musiclyricList" ref="musicLyric" v-show="isLyricShow">
   <p v-for="item in lyric" :key="item" :class="{active:(store.currentTime*1000)>=item.time&&store.currentTime*1000<item.pre}">{{item.lrc}}</p>
  </div>
  <!-- 底部 -->
  <div class="footer">
    <div class="footertop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-aixin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlechangpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caozuo-xunhuan1"></use>
      </svg>
    </div>
    <!-- 进度条 -->
    <div class="footcontent">
      <!-- 进度条 -->
      <input type="range" class="range" min="0" :max="store.duration" v-model="store.currentTime" step="0.05">
    </div>
    <div class="footerbottom">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caozuo-xunhuan1"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="icon play" aria-hidden="true" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon play" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true"  @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao2"></use>
      </svg>
    </div>
  </div>
</template>

<style lang='less' scoped>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(1rem);

}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .2rem .3rem;
  color: white;

  .icon {
    fill: white;
  }

  .left {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .mleft {
      margin-left: .2rem;
      padding-top: .2rem;

      span {
        font-size: .22rem;
        color: gray;
      }

      .icon {
        width: .2rem;
        vertical-align: middle;
        fill: gray;
      }
    }
  }
}

.content {
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }

  //磁盘播放时磁针的类
  .needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }

  .cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }

  .ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    /* 使用动画匀速，无限循环 */
    animation: rotate_ar 10s linear infinite;
  }

  .ar_active {
    animation-play-state: running;
  }

  .ar_paused {
    animation-play-state: paused;
  }

  /* 定义图片旋转动画 */
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }
}
/* 歌词 */
.musiclyricList{
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .2rem;
  //溢出滚动
  overflow: scroll;
  p{
    color:rgb(195, 239, 244);
    margin-bottom: .4rem;
  }
  //高亮显示的歌词
  .active{
    color: white;
    font-size: .4rem;
  }
}

.footer {
  position: fixed;
  bottom: .6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 18%;

  .footertop,
  .footerbottom {
    display: flex;
    justify-content: space-around;
    padding: 0 .2rem;
    align-items: center;

    .icon {
      fill: white;
    }
  }
  //进度条
  .range{
    width: 100%;
    height: .06rem;
  }

  .footerbottom {

    .play {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
