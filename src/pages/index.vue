<template>
  <div class="relative w-full h-screen min-h-screen">
    <img
        src="https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6xc454vj31hc0u07wh.jpg"
        alt="背景"
        :class="['fixed top-0 left-0 object-cover -z-30 w-full h-full duration-100 opacity-0']"
    >
    <div class="cover"/>
    <NavBar/>
    <div class="main">
      <div class="absolute left-1/2 -translate-x-1/2 w-full flex-center top-32 flex-col">
        <!--        有背景时间就变成白色-->
        <div
            class="text-4xl font-semibold cursor-pointer hover:scale-125 duration-200 mb-6">
          11:22
        </div>
        <MySearch/>
      </div>
    </div>

    <!--主要内容-->
    <!--    <div class="main" @click.self="handleClickClose">-->
    <!--      &lt;!&ndash;    时间&ndash;&gt;-->

    <!--      &lt;!&ndash;搜索框&ndash;&gt;-->

    <!--      &lt;!&ndash;    快捷方式&ndash;&gt;-->
    <!--      <MyTools/>-->
    <!--    </div>-->
    <!--    <MyFooter/>-->
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
.content {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
  background: #f5f5f5;
}

.cover {
  z-index: -10;
  opacity:1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  transition: .25s;
}

.main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}
</style>