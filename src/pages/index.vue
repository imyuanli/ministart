<template>
  <div class="content" @click.self="handleClickClose" @contextmenu.prevent.stop="">
    <img
        src="https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6xc454vj31hc0u07wh.jpg"
        alt="背景"
        :class="['fixed top-0 left-0 object-cover -z-30 w-full h-full duration-100',isTwoPage || isFocus?'scale-110 blur':'']"
    >
    <div class="cover"/>
    <NavBar/>
    <!--主要内容-->
    <div class="main" @click.self="handleClickClose">
      <!--    时间-->
      <div
          class="absolute left-1/2 -translate-x-1/2 top-24 text-4xl font-semibold cursor-pointer hover:scale-125 duration-200 text-white">
        11:22
      </div>
      <!--搜索框-->
      <MySearch :isFocus="isFocus" :handleClickOpen="handleClickOpen"/>
      <!--    快捷方式-->
      <MyTools/>
    </div>
    <MyFooter/>
  </div>
</template>

<script setup>
import {ref} from "vue";
import MySearch from '../components/my-search.vue'
import MyTools from '../components/my-tools.vue'
import NavBar from '../components/nav-bar.vue'
import MyFooter from "../components/my-footer.vue";
//输入框的值
const inputValue = ref(null)
//输入框聚焦
const isFocus = ref(false)
const handleClickOpen = () => {
  isFocus.value = true
}
const handleClickClose = () => {
  isFocus.value = false
}

//常规设置

// 时间或日期
const settingTime = {
  //显示时间
  showTime: false,
  //年月日
  showDate: false,
  //农历
  showLunarCalendar: false,
  //周
  showWeek: false,
  //秒
  showSecond: false,
}

//一言
const settingWord = {
  showWord: false,
  showAuthor: false,
  showSource: false,
}

//主题

</script>

<style scoped>
.content {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
}

.cover {
  z-index: -10;
  opacity: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, .3) 166%);
  transition: .25s;
}

.main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}
</style>