<!-- 登录路由组件 -->
<script setup>
/* 在setup中使用访问路由 */
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { FooterMusicStore } from '@/store/FooterMusic.js'
import { getLoginUser } from '@/api/homeApi.js'
const store = FooterMusicStore()
const router = useRouter()

const phone = ref('')
const password = ref('')

const Login = async () => {
  const res = await store.getLogin({ phone: phone.value, password: password.value })
  console.log(res)
  if (res.data.code === 200) {
    // 将用户登录状态传过去
    store.udpateIsLogin(true)
    // 将用户id传到发起获取用户详情的接口
    const result = await getLoginUser(res.data.account.id)
    console.log('获取用户详情返回的数据:', result)
    // 将后端返回来的token传去pinia和本地存储
    store.updateToken(res.data.token)
    // 将用户详情数据存储到pinia和本地存储
    store.updateUser(result)
    // 如果返回的code为200，说明登录成功，跳转个人中心页面
    router.push('/infoUser')
  } else {
    alert('手机号码或密码错误！')
  }
}

</script>

<template>
  <div class="loginBox">
    <div class="title">
      欢迎登录
    </div>
    <div class="form" @keydown.enter="Login">
      <input type="text" placeholder="请输入手机号" v-model="phone">
      <input type="password" placeholder="请输入密码" v-model="password">
      <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" @click="Login">
        登录
      </van-button>
    </div>
    <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" @click="$router.go(-1)">
      返回首页
    </van-button>
  </div>
</template>

<style lang='less' scoped>
.loginBox {
  height: 13.4rem;
  width: 100%;
  background-color: #ae3311ec;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: .8rem;
    font-weight: 600;
    color: white;
    margin-top: 2.5rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    padding: .2rem;

    input {
      height: .8rem;
      border: none;
      margin: .2rem 0;
      border-radius: .2rem;
      padding: .2rem;
    }
  }
}
</style>
