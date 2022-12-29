<template>
  <div class="relative w-full h-screen min-h-screen">
    <img
        src="https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6xc454vj31hc0u07wh.jpg"
        alt="背景"
        class="fixed top-0 left-0 object-cover -z-30 w-full h-full duration-100 opacity-1 scale-105"
        v-if="commonSettings.showBackImg"
    >
    <div class="cover"
         :class="[commonSettings.showBackImg?
         'cover-image'
         :
         'cover-background'
         ]"
    />
    <Header :commonSettings="commonSettings"/>
    <div class="main">
      <div v-if="commonSettings.showTime">
        <div
            class="absolute left-1/2 -translate-x-1/2 top-36 text-4xl font-semibold cursor-pointer hover:scale-125 duration-200">
          {{ dayjs(new Date()).format("HH:mm") }}
        </div>
      </div>
      <MySearch/>
    </div>
    <div v-if="commonSettings.showShortcut">
      <Shortcut/>
    </div>
    <div v-if="commonSettings.showFooter">
      <MyFooter/>
    </div>
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
    store.get("commonSettings") ?
        store.get("commonSettings")
        :
        {
          showTime: false,
          showShortcut: false,
          showFooter: false,
          showBackImg: false,
        }
)

watch(commonSettings, (newData) => {
  store.set("commonSettings", newData)
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
// const model = ref('simple')

// console.log(dayjs().year())
// console.log(dayjs().month())
// console.log(dayjs().date())
// console.log(dayjs().hour())
// console.log(dayjs().minute())
// console.log(dayjs().second())
// console.log(dayjs().day())
// const commonSettings=reactive({
//
// })

</script>

<style scoped>
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
  background: #E7F0F7;
}

.cover-image {
  background-image: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, .3) 166%);
}

.main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}
</style>