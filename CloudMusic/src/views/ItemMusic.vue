<script setup>
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getMusicItem, getMusicItemList } from '@/api/itemApi.js'
/* 引入子组件 */
import ItemMusicTop from '@/components/item/itemMusicTop.vue'
import ItemMusicList from '@/components/item/itemMusicList.vue'

const state = reactive({
  playlist: {}, // 歌单详情页数据
  itemList: []// 歌单的歌曲
})

// useRoute可以拿到路由的参数
onMounted(async () => {
  /* 可以调用useRoute方法的query拿到id */
  const id = useRoute().query.id
  // console.log(id)
  /* 获取歌单详情 */
  const res = await getMusicItem(id)
  // console.log(res)
  state.playlist = res.data.playlist
  /* 获取歌单歌曲 */
  const result = await getMusicItemList(id)
  // console.log(result)
  state.itemList = result.data.songs
  /* 为防止页面刷新，数据丢失，将数据保存到sessionStorage */
  sessionStorage.setItem('itemDetail', JSON.stringify(state))
})

</script>

<template>
  <ItemMusicTop :playlist="state.playlist"></ItemMusicTop>
  <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"></ItemMusicList>
</template>

<style lang='less' scoped>
</style>
