<template>
  <div class="content" @click.self="handleClickClose" @contextmenu.prevent.stop="">
    <!--    背景图片-->
    <img
        src="https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6xc454vj31hc0u07wh.jpg"
        alt="背景"
        :class="['fixed top-0 left-0 object-cover -z-30 w-full h-full duration-100',isTwoPage || isFocus?'scale-110 blur':'']"
    >
    <!--    背景颜色-->
    <div class="cover"/>
    <!--    时间-->
    <div class="absolute-center top-24 text-4xl font-semibold cursor-pointer hover:scale-125 duration-200 text-white">
      11:22
    </div>
    <!--搜索框-->
    <Search
        :isFocus="isFocus"
        :handleClickOpen="handleClickOpen"
    />

    <!--    快捷方式-->
    <Tools/>
    <!--    <div v-show="!isTwoPage">-->
    <!--     -->
    <!--    </div>-->
    <!--    &lt;!&ndash;    二级页面&ndash;&gt;-->
    <!--    <div v-show="isTwoPage">-->
    <!--      123123-->
    <!--    </div>-->
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

//二级也页面
// const isTwoPage = ref(false)
//鼠标右键
// const handleInputHidden = () => {
//   isTwoPage.value = false
// }
// const handleInputBlock= () => {
//   isTwoPage.value = true
// }

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
</style>