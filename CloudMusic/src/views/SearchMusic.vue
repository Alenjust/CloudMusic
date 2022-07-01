<script setup>
import { onMounted, ref } from 'vue'
import { getSearchMusic } from '@/api/homeApi.js'
import { FooterMusicStore } from '@/store/FooterMusic.js'
const store = FooterMusicStore()

// 搜索关键词数组
const keyWorldList = ref([])
// 获取到的关键词渲染到页面
const searchKey = ref('')
// 搜索请求回来的数据列表
const searchList = ref([])

onMounted(() => {
  // 页面渲染时读取本地历史记录
  keyWorldList.value = JSON.parse(localStorage.getItem('keyWorldList')) ? JSON.parse(localStorage.getItem('keyWorldList')) : []
})

// 输入框回车操作进行搜索
const enterKey = async () => {
  if ((searchKey.value !== '')) {
    // 数组向前追加元素
    keyWorldList.value.unshift(searchKey.value)
    // 去重,这里用到Set语法
    keyWorldList.value = [...new Set(keyWorldList.value)]
    console.log([...new Set(keyWorldList.value)])
    // 固定长度
    if (keyWorldList.value.length > 10) {
      keyWorldList.value.splice(keyWorldList.value.length - 1)
    }
    // 将历史记录保存到本地
    localStorage.setItem('keyWorldList', JSON.stringify(keyWorldList.value))
    const res = await getSearchMusic(searchKey.value)
    console.log(res)
    // 将请求回来的数据进行接收
    searchList.value = res.data.result.songs
    searchKey.value = ''
  }
}
// 点击删除按钮清除记录
const delHistory = () => {
  localStorage.removeItem('keyWorldList')
  keyWorldList.value = []
}

// 点击历史标签也返回数据
const searchHistory = async (item) => {
  const res = await getSearchMusic(item)
  console.log(res)
  // 将请求回来的数据进行接收
  searchList.value = res.data.result.songs
}

// 点击列表歌曲播放音乐
const updateIndex = (item, index) => {
  item.al = item.album
  item.al.picUrl = item.album.artist.img1v1Url
  item.ar = item.artists
  store.pushPlayList(item)
  store.updateplayListIndex(store.playlist.length - 1)
}
</script>

<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input type="text" placeholder="阿拉斯加湾" v-model="searchKey" @keydown.enter="enterKey">
  </div>
  <div class="searchHistory">
    <span class="searchspan">历史</span>
    <span v-for="item in keyWorldList" :key="item" class="spankey" @click="searchHistory(item)">
      {{ item }}</span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-weibiaoti6"></use>
    </svg>
  </div>
  <div class="itemlist">
    <div class="item" v-for="(item, index) in searchList" :key="item">
      <span class="id">{{ index + 1 }}</span>
      <div class="songmsg" @click="updateIndex(item, index)">
        <p class="song">{{ item.name }}</p>
        <span class="singer" v-for="(item1, i) in item.artists" :key="i">{{ item1.name }}&nbsp;</span>
      </div>
      <div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shipin" v-if="item.mvid != 0"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao2"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang='less' scoped>
.searchTop {
  width: 100%;
  height: 1rem;
  padding: .2rem .2rem;
  display: flex;
  align-items: center;

  input {
    margin-left: .2rem;
    border: none;
    border-bottom: 1px solid black;
    border-radius: .1rem;
    width: 90%;
    padding: .1rem;
  }
}

.searchHistory {
  width: 100%;
  padding: .25rem;
  position: relative;

  .searchspan {
    font-weight: 700;
  }

  .spankey {
    padding: .1rem .2rem;
    background: rgb(231, 207, 207);
    border-radius: .4rem;
    margin: .1rem .2rem;
    display: inline-block;
  }

  .icon {
    width: .36rem;
    height: .36rem;
    position: absolute;
    right: .25rem;
  }
}

.itemlist {
  width: 100%;
  padding: .2rem;

  .item {
    display: flex;
    justify-content: space-between;
    height: 1.2rem;
    align-items: center;
    padding: .3rem 0;

    .id {
      flex: 1;
      width: .2rem;
      margin-left: .3rem;
    }

    .songmsg {
      flex: 8;

      .song {
        font-weight: 600;
      }

      .singer {
        margin-top: .04rem;
        font-size: .2rem;
        color: gray;
      }
    }

    .icon {
      flex: 1;
      width: .5rem;
      margin: 0 .1rem 0 .2rem;
    }
  }
}
</style>
