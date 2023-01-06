<template>
  <div class="relative w-full h-screen min-h-screen flex justify-start items-center flex-col pt-12 md:pt-16">
    <div
        class="back-img"
    />
    <Header :commonSettings="commonSettings"/>
    <MyTime :timeSetting="commonSettings.timeSetting"/>
    <MySearch :searchSetting="commonSettings.searchSetting"/>
    <Shortcut :toolSetting="commonSettings.toolSetting"/>
    <MyFooter :simple="commonSettings.baseSetting.simpleFooter"/>
  </div>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import Header from "../components/header.vue";
import MyTime from '../components/my-time.vue'
import MySearch from '../components/my-search.vue'
import MyFooter from "../components/my-footer.vue";
import Shortcut from "../components/shortcut.vue";
import store from "store";
import _ from 'lodash'


const defaultSet = {
  baseSetting: {
    simpleFooter: false
  },
  timeSetting: {
    show: true,
    month: true,
    week: true,
    lunar: true,
    weight: true,
    family: "Arial",
    size: 40,
    color: "#ffffff"
  },
  searchSetting: {
    show: true,
    height: 46,
    radius: 30,
    opacity: 70,
    blank: true,
  },
  toolSetting: {
    show: true,
    size: 60,
    radius: 15,
    opacity: 100,
    gapX: 30,
    gapY: 30,
    maxWidth: 1200
  },
}
const commonSettings = reactive(
    store.get("commonSettings") ?
        _.merge({}, defaultSet, store.get("commonSettings"))
        :
        {...defaultSet}
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
  background-image: url("https://api.paugram.com/bing/");

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
</style>