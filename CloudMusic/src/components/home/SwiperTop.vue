<script setup >
import { toRefs, reactive, onMounted } from 'vue'
import { getBanner } from '@/api/homeApi.js'

const state = reactive({
  images: [
    'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b717c9c84e44409496e993ed6b526c05.jpg?thumb=1&w=1533&h=575&f=webp&q=90',
    'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b158441e01e7acd9ad27a49bbac4c0fa.jpg?thumb=1&w=1533&h=575&f=webp&q=90'
  ]
})
onMounted(async () => {
  /* axios.get('http://localhost:3000/banner?type=2').then((res) => {
    console.log(res)
    state.images = res.data.banners
    console.log(state.images)
  }) */
  const res = await getBanner(2)
  state.images = res.data.banners
})

const { images } = toRefs(state)

</script>

<template>
  <div id="swiperTop">
    <!-- 懒加载 -->
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>

</template>

<style lang='less'>
#swiperTop {
  padding: 0 .2rem;

  .van-swipe {
    width: 100%;

    .van-swipe__track {
      .van-swipe-item {
        img {
          width: 100%;
          height: 3rem;
          border-radius: .16rem;
        }
      }
    }

    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>
