<template>
  <div class="relative w-full h-screen min-h-screen">
    <img
        src="https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6xc454vj31hc0u07wh.jpg"
        alt="背景"
        :class="['fixed top-0 left-0 object-cover -z-30 w-full h-full duration-100 opacity-1']"
    >
    <div class="cover"/>
    <NavBar/>
    <div class="main">
      <div class="absolute left-1/2 -translate-x-1/2 w-full flex-center top-28 flex-col">
        <!--        有背景时间就变成白色-->
        <div
            class="text-4xl font-semibold cursor-pointer hover:scale-125 duration-200 mb-6">
          11:22
        </div>
        <MySearch/>
      </div>
    </div>
    <MyTools/>
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
.cover {
  z-index: -10;
  opacity: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /*background: #E7F0F7;*/
  transition: .25s;
  background-image: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, .3) 166%);

}

.main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}
</style>