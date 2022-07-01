<script>
import { getMusicList } from '@/api/homeApi'
import { reactive, onMounted, toRefs } from 'vue'

/* 用vue2语法获取数据 */
/* export default {
  data () {
    return {
      musicList: []
    }
  },
  methods: {
    // 获取发现歌单
    async getGnedan () {
      const res = await getMusicList()
      console.log(res)
      this.musicList = res.data.result
    },
    // 对播放量进行处理
    changeCount: function (num) {
      if (num >= 100000000) {
        // toFixed(1)显示一位小数
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
  },
  mounted () {
    this.getGnedan()
  }
} */

/* vue3.0版本写法 */
export default {
  setup () {
    const state = reactive({
      musicList: []
    })
    onMounted(async () => {
      const res = await getMusicList()
      // console.log(res)
      state.musicList = res.data.result
    })
    // 对播放量进行处理
    const changeCount = function (num) {
      if (num >= 100000000) {
        // toFixed(1)显示一位小数
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
    return {
      ...toRefs(state),
      changeCount
    }
  }
}
</script>

<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单
      </div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe :loop="false" :width="150" :show-indicators="false" class="my-swiper">
        <van-swipe-item v-for="item in musicList" :key="item.id">
          <router-link :to="{ path: '/itemMusic', query: { id: item.id } }">
            <img :src="item.picUrl">
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-a-24gl-play1"></use>
              </svg>
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang='less' scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;

  .musicTop {
    width: 100%;
    height: .6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: .2rem;

    .title {
      font-size: .4rem;
      font-weight: 900;
    }

    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: .6rem;
      padding: 0 .2rem;
      border-radius: .4rem;
    }
  }

  .musicContent {
    width: 100%;
    height: 4rem;

    .my-swiper {
      height: 100%;

      .van-swipe-item {
        margin-right: .16rem;
        position: relative;

        img {
          width: 100%;
          height: 3rem;
          border-radius: .2rem;
        }

        .playCount {
          position: absolute;
          top: .2rem;
          right: 0;
          padding: .05rem 0.05rem 0.06rem;
          font-size: .24rem;
          background-color: #ccc;
          opacity: .8;
          height: .4rem;
          border-radius: .24rem;
          text-align: center;
          color: white;
          /* 文本超出显示省略号 */
          text-overflow: ellipsis;

          svg {
            width: .24rem;
            height: 80%;
            color: white;

          }
        }
      }
    }
  }
}
</style>
