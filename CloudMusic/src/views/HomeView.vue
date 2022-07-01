<template>
  <!-- 头部组件 -->
  <TopNav></TopNav>
  <!-- 轮播图 -->
  <SwiperTop></SwiperTop>
  <!-- 图标列表 -->
  <IconList></IconList>
  <hr>
  <!-- 发现好歌单列表 -->
  <MusicList></MusicList>
</template>

<script setup>
import TopNav from '@/components/home/TopNav.vue'
import SwiperTop from '@/components/home/SwiperTop.vue'
import IconList from '@/components/home/IconList.vue'
import MusicList from '../components/home/MusicList.vue'

</script>
