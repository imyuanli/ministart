<template>
  <div class="relative w-full h-screen min-h-screen">
    <!--    <img-->
    <!--        src="https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6xc454vj31hc0u07wh.jpg"-->
    <!--        alt="背景"-->
    <!--        class="fixed top-0 left-0 object-cover -z-30 w-full h-full duration-100 opacity-1 scale-105"-->
    <!--    >-->
    <!---->
    <div
        class="cover"
    />
    <div class="main">
      <div class="absolute left-1/2 -translate-x-1/2 top-36 text-4xl font-semibold cursor-pointer hover:scale-125 duration-200">
        {{ dayjs(new Date()).format("HH:mm") }}
      </div>
      <MySearch/>
    </div>
    <Shortcut/>
  </div>

  <!--  <div class="relative w-full h-screen min-h-screen" @click.self="handleClickClose">-->
  <!--    <div  @click.self="handleClickClose">-->
  <!--      <div>-->
  <!--        <div-->
  <!--            class="absolute left-1/2 -translate-x-1/2 top-36 text-4xl font-semibold cursor-pointer hover:scale-125 duration-200">-->
  <!--          {{ dayjs(new Date()).format("HH:mm") }}-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      <MySearch/>-->
  <!--    </div>-->
  <!--    -->
  <!--    &lt;!&ndash;    <div v-if="commonSetting.showShortcut">&ndash;&gt;-->

  <!--    &lt;!&ndash;    </div>&ndash;&gt;-->
  <!--    &lt;!&ndash;    <div v-if="commonSetting.showFooter">&ndash;&gt;-->
  <!--    &lt;!&ndash;      <MyFooter :textColor="getTextColor(commonSetting.showBackImg)"/>&ndash;&gt;-->
  <!--    &lt;!&ndash;    </div>&ndash;&gt;-->
  <!--  </div>-->
</template>

<script setup>
import {reactive, ref} from "vue";
import dayjs from "dayjs"
// import Header from "../components/header.vue";
import MySearch from '../components/my-search.vue'
import Shortcut from '../components/shortcut.vue'
// import MyFooter from "../components/my-footer.vue";
// import {getTextColor, getBackgroundColor} from '../utils/index.js'

// //输入框聚焦
// const isFocus = ref(false)
// const handleClickOpen = () => {
//   isFocus.value = true
// }
// const handleClickClose = () => {
//   isFocus.value = false
// }
//
// const options = [
//   {
//     value: 'simple',
//     label: '极简模式',
//   },
//   {
//     value: 'normal',
//     label: '标准模式',
//   },
//   {
//     value: 'dark',
//     label: '暗黑模式',
//   },
//   // {
//   //   value: 'flow',
//   //   label: '流畅模式',
//   // }
// ]
// const model = ref('simple')

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
  transition: .25s;
  background: #E7F0F7;
  /*background-image: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, .3) 166%);*/
}

.main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}
</style>