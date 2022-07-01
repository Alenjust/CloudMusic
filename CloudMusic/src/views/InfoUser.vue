<script setup>
import { FooterMusicStore } from '@/store/FooterMusic.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = FooterMusicStore()
const mydata = ref({})
mydata.value = JSON.parse(localStorage.getItem('mydata'))
store.updateUser(mydata)
console.log(mydata)
console.log(store.user)

const unLogin = () => {
  localStorage.removeItem(['mydata', 'token'])
  store.updateToken('')
  store.updateUser('')
  router.push('/')
}
</script>

<template>
  <h1>个人页面</h1>
  <img :src="mydata.data.profile.backgroundUrl" class="bgimg">
  <div class="infoUser">
    <van-nav-bar title="个人中心" left-text="返回" :placeholder="true" left-arrow @click-left="$router.push('/')" />
    <div class="top">
      <div class="infousertop">
        <img :src="mydata.data.profile.avatarUrl" class="profileimg">
        <div class="name">
          {{ mydata.data.profile.nickname }}
        </div>
      </div>
      <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" @click="unLogin">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<style lang='less' scoped>
.bgimg {
  width: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(.1rem);
}

.infoUser {

  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;

    .van-button {
      width: 3rem;
    }

    .infousertop {
      width: 100%;
      height: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .profileimg {
        width: 1rem;
        height: 1rem;
        margin-top: .2rem;
        border-radius: 50%;
      }

      .name {
        font-weight: 700;
        font-size: .4rem;
      }
    }
  }

}
</style>
