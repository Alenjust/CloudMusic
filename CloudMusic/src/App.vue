<script setup>
import FooterMusic from '@/components/item/FooterMusic.vue'
import { FooterMusicStore } from '@/store/FooterMusic.js'
const store = FooterMusicStore()

</script>
<!-- 根组件 -->
<template>
  <!-- 路由出口,一般搭配 <router-link to=""></router-link>使用 -->
  <router-view />
  <FooterMusic v-show="store.isFooterMusic"></FooterMusic>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.icon {
  width: .5rem;
  height: .5rem;
}
a{
  color: black;
}
</style>
