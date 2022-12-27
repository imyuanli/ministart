<template>
  <div class="content" @click.self="handleClickClose" @contextmenu.prevent.stop="">
    <img
        src="https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6xc454vj31hc0u07wh.jpg"
        alt="背景"
        :class="['fixed top-0 left-0 object-cover -z-30 w-full h-full duration-100',isTwoPage || isFocus?'scale-110 blur':'']"
    >
    <div class="cover"/>
    <div class="main">
      <!--    时间-->
      <div class="absolute-center top-24 text-4xl font-semibold cursor-pointer hover:scale-125 duration-200 text-white">
        11:22
      </div>
      <!--搜索框-->
      <Search :isFocus="isFocus" :handleClickOpen="handleClickOpen"/>
      <!--    快捷方式-->
      <Tools/>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import Search from '../components/search.vue'
import Tools from '../components/tools.vue'
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
</script>

<style scoped>
.content {
  position: relative;
  width: 100%;
  height: 100vh;
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
  width: 90%;
  max-width: 1000px;
  min-width: 320px;
  margin: auto;
  height: 100%;
}
</style>