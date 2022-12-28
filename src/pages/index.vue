<template>
  <div class="relative w-full h-screen min-h-screen" @click.self="handleClickClose">
    <!--    <img-->
    <!--        src="https://tva4.sinaimg.cn/large/0060lm7Tly1ftg6xc454vj31hc0u07wh.jpg"-->
    <!--        alt="背景"-->
    <!--        class="fixed top-0 left-0 object-cover -z-30 w-full h-full duration-100 opacity-1 scale-105"-->
    <!--        :class="[commonSetting.isNormModel && isFocus && 'scale-125 blur']"-->
    <!--        v-if="commonSetting.isNormModel || commonSetting.showBackImg"-->
    <!--    >-->
    <div
        class="cover"
        :class="getBackgroundColor(model)"
    />
    <!--    <Header :commonSetting="commonSetting"/>-->
    <div class="main " @click.self="handleClickClose">
      <el-select v-model="model" class="absolute left-0 top-0" placeholder="Select" size="large">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <div>
        <div
            class="absolute left-1/2 -translate-x-1/2 top-32 text-4xl  font-semibold cursor-pointer hover:scale-125 duration-200"
            :class="getTextColor(model)"
        >
          {{ dayjs(new Date()).format("HH:mm") }}
        </div>
      </div>
      <MySearch
          :model="model"
      />
    </div>
    <!--    <div v-if="commonSetting.showShortcut">-->
    <!--      <Shortcut-->
    <!--          :isNormModel="commonSetting.isNormModel"-->
    <!--          :showBackImg="commonSetting.showBackImg"-->
    <!--      />-->
    <!--    </div>-->
    <!--    <div v-if="commonSetting.showFooter">-->
    <!--      <MyFooter :textColor="getTextColor(commonSetting.showBackImg)"/>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import Header from "../components/header.vue";
import MySearch from '../components/my-search.vue'
import Shortcut from '../components/shortcut.vue'
import MyFooter from "../components/my-footer.vue";
import {getTextColor, getBackgroundColor} from '../utils/index.js'
import dayjs from "dayjs"
//输入框聚焦
const isFocus = ref(false)
const handleClickOpen = () => {
  isFocus.value = true
}
const handleClickClose = () => {
  isFocus.value = false
}

const options = [
  {
    value: 'simple',
    label: '极简模式',
  },
  {
    value: 'normal',
    label: '标准模式',
  },
  {
    value: 'dark',
    label: '暗黑模式',
  },
  // {
  //   value: 'flow',
  //   label: '流畅模式',
  // }
]
const model = ref('simple')
//常规设置
// const commonSetting = reactive({
//   model: '',
//   // showTime: true,
//   // showWord: false,
//   // showShortcut: true,
//   // showBackImg: false,
//   // showFooter: false,
//   // showBlackBlur: false,
// })
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