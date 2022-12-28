<template>
  <div class="relative w-full h-screen min-h-screen" @click.self="handleClickClose">
    <img
        src="https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6xc454vj31hc0u07wh.jpg"
        alt="背景"
        :class="['fixed top-0 left-0 object-cover -z-30 w-full h-full duration-100 opacity-1',isFocus ? 'scale-110 blur':'']"
        v-if="commonSetting.showBackImg"
    >
    <div :class="['cover',commonSetting.showBackImg?`${commonSetting.showBlackBlur?'cover-bg':''}`:'cover-bg-color']"/>
    <Header :commonSetting="commonSetting"/>
    <div class="main" @click.self="handleClickClose">
      <div v-if="commonSetting.showTime">
        <div :class="['absolute left-1/2 -translate-x-1/2 top-44 text-4xl  font-semibold cursor-pointer hover:scale-125 duration-200',
            getTextColor(commonSetting.showBackImg)]"
        >
          {{ dayjs(new Date()).format("HH:mm") }}
        </div>
      </div>
      <MySearch
          :showBackImg="commonSetting.showBackImg"
          :isFocus="isFocus"
          :handleClickOpen="handleClickOpen"
      />
    </div>
    <div v-if="commonSetting.showShortcut">
      <Shortcut :showBackImg="commonSetting.showBackImg"/>
    </div>
    <div v-if="commonSetting.showFooter">
      <MyFooter :textColor="getTextColor(commonSetting.showBackImg)"/>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref, onMounted} from "vue";
import Header from "../components/header.vue";
import MySearch from '../components/my-search.vue'
import Shortcut from '../components/shortcut.vue'
import NavBar from '../components/header.vue'
import MyFooter from "../components/my-footer.vue";
import {getTextColor} from '../utils/index.js'
import dayjs from "dayjs"
//时间


//输入框聚焦
const isFocus = ref(false)
const handleClickOpen = () => {
  isFocus.value = true
}
const handleClickClose = () => {
  isFocus.value = false
}

//常规设置
const commonSetting = reactive({
  isSimpleStyle: true,
  showTime: true,
  showWord: false,
  showShortcut: true,
  showBackImg: true,
  showFooter: false,
  showBlackBlur: true,
})
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
}

.cover-bg-color {
  background: #E7F0F7;
}

.cover-bg {
  background-image: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, .3) 166%);
}

.main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}
</style>