<template>
  <div class="relative w-full h-screen min-h-screen">
    <div
        class="back-img fixed top-0 left-0 object-cover -z-30 w-full h-full duration-100"
        style="background-image: url('https://cn.bing.com/th?id=OHR.ChalkRock_ZH-CN2893565655_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&qlt=50')">
    </div>
    <Header :commonSettings="commonSettings"/>
    <!--    <div class="main">-->
    <!--      <div v-if="commonSettings.showTime">-->
    <!--        <div-->
    <!--            class="absolute left-1/2 -translate-x-1/2 top-36 md:top-1/2 text-4xl font-semibold cursor-pointer hover:scale-125 duration-200">-->
    <!--          {{ dayjs(new Date()).format("HH:mm") }}-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <MySearch :isOpenNewTab="commonSettings.isNewTab"/>-->
    <!--    </div>-->
    <!--    <div v-if="commonSettings.showShortcut">-->
    <!--      <Shortcut/>-->
    <!--    </div>-->
    <!--    <div v-if="commonSettings.showFooter">-->
    <!--      <MyFooter/>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import dayjs from "dayjs"
import Header from "../components/header.vue";
import MySearch from '../components/my-search.vue'
import Shortcut from '../components/shortcut.vue'
import MyFooter from "../components/my-footer.vue";
// import {getTextColor, getBackgroundColor} from '../utils/index.js'
import store from 'store'

const commonSettings = reactive(
    {
      timeSetting: {
        time:true,
        hover24:true,
        month:true,
        week:true,
        lunar:true,
        second:false,
        weight:true,
        family: "Arial",
        size: 40,
        color: "#ffffff",
      },
      // searchBox:{},
      base:{
        iconOpenNewBlank: true,
        searchOpenNewBlank: true,
        showWord:false,
      }
    }
)

watch(commonSettings, (newData) => {
  console.log(commonSettings)
  // store.set("commonSettings", newData)
})

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

</script>

<style scoped>
.back-img:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(var(--wall-blur));
  background-color: rgba(0, 0, 0, var(--wall-mask));
}

.cover {
  z-index: -10;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: .25s;
}

.cover-background {
  background: #f7f7f7;
}

.cover-image {
  background-image: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
}

.main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}
</style>