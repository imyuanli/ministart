<template>
  <div class="relative w-full h-screen min-h-screen flex-center">
    <div
        class="back-img"
        :style="{backgroundImage:`url(${imgUrl})`}"
    />
    <Header :commonSettings="commonSettings"/>
    <div class="main ">
      <MyTime :timeSetting="commonSettings.timeSetting"/>
      <MySearch :searchSetting="commonSettings.searchSetting"/>
      <Shortcut :toolSetting="commonSettings.toolSetting"/>
    </div>
    <MyFooter :simple="baseSetting.simpleFooter"/>
  </div>
</template>

<script setup>
import {reactive, ref, toRefs, watch} from "vue";
import Header from "../components/header.vue";
import MyTime from '../components/my-time.vue'
import MySearch from '../components/my-search.vue'

import MyFooter from "../components/my-footer.vue";
import Shortcut from "../components/shortcut.vue";

const imgUrl = ref('https://cn.bing.com/th?id=OHR.ChalkRock_ZH-CN2893565655_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&qlt=50')
const commonSettings = reactive(
    {
      timeSetting: {
        time: true,
        month: true,
        week: true,
        lunar: true,
        weight: true,
        family: "Arial",
        size: 40,
        color: "#ffffff",
      },
      searchSetting: {
        search: true,
        height: 46,
        radius: 30,
        opacity: 70,
        blank: true,
      },
      toolSetting: {
        size: 60,
        radius: 30,
        opacity: 100,
        gapX: 30,
        gapY: 30,
      },
      // searchBox:{},
      baseSetting: {
        iconNewBlank: true,
        searchNewBlank: true,
        showWord: false,
        simpleFooter: false,
      }
    }
)
const {baseSetting} = toRefs(commonSettings)

watch(commonSettings, (newData) => {
  // console.log(commonSettings)
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
.back-img {
  position: fixed;
  top: 0;
  left: 0;
  object-fit: cover;
  z-index: -30;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 60px;
}
</style>