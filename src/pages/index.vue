<template>
  <div class="relative w-full h-screen max-h-screen"
       @click.self="handleClickClose">
    <!--    <Shortcut :toolSetting="commonSettings.toolSetting" :isFocus="isFocus"/>-->
    <!--    <MyFooter :simple="commonSettings.baseSetting.simpleFooter"/>-->
    <!--    <el-button @click="isDrag=true">能</el-button>-->
    <!--    <el-button @click="isDrag=false">否</el-button>-->
    <!--    <grid-layout-->
    <!--        v-model:layout="list"-->
    <!--        :col-num="12"-->
    <!--        :row-height="48"-->
    <!--        :is-draggable="isDrag"-->
    <!--        :is-resizable="isDrag"-->
    <!--        :responsive="true"-->
    <!--        :vertical-compact="false"-->
    <!--        :use-css-transforms="true"-->
    <!--        @click.self="handleClickClose"-->
    <!--    >-->
    <!--&lt;!&ndash;      <div class="back-img duration-150" :class="[isFocus ? 'scale-105':'']"/>&ndash;&gt;-->
    <!--&lt;!&ndash;      <div v-show="isFocus" class="cover duration-150"/>&ndash;&gt;-->
    <!--      <grid-item-->
    <!--          v-for="item in list"-->
    <!--          :x="item.x"-->
    <!--          :y="item.y"-->
    <!--          :w="item.w"-->
    <!--          :h="item.h"-->
    <!--          :i="item.i"-->
    <!--      >-->
    <!--        <div class="h-full" :class="[isDrag?'asdad':'']">-->
    <!--          <div v-show="item.i=='search'">-->
    <!--            <MySearch-->
    <!--                :searchSetting="commonSettings.searchSetting"-->
    <!--                :isFocus="isFocus"-->
    <!--                :handleClickOpen="handleClickOpen"-->
    <!--            />-->
    <!--          </div>-->
    <!--          <div v-show="item.i=='time'">-->
    <!--            <MyTime :timeSetting="commonSettings.timeSetting"/>-->
    <!--          </div>-->
    <!--          <div v-show="item.i=='header'" class="flex-center h-full">-->
    <!--            <Header :commonSettings="commonSettings"/>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div v-if="isDrag" class="fixed top-0 left-0 t w-full h-full z-50"></div>-->
    <!--      </grid-item>-->
    <!--    </grid-layout>-->
    <el-carousel
        :indicator-position="indicator?'outside':'none'"
        :autoplay="false"
        trigger="click"
        class="h-full"
    >
      <el-carousel-item
          v-for="item in 4"
          :label="item+'1'"
          :key="item"
      >
        <h3 class="text-3xl ">{{ item }}</h3>

        <!--        <grid-layout-->
        <!--            v-model:layout="list"-->
        <!--            :col-num="12"-->
        <!--            :row-height="48"-->
        <!--            :is-draggable="isDrag"-->
        <!--            :is-resizable="isDrag"-->
        <!--            :responsive="true"-->
        <!--            :vertical-compact="false"-->
        <!--            :use-css-transforms="true"-->
        <!--            @click.self="handleClickClose"-->
        <!--        >-->
        <!--          &lt;!&ndash;      <div class="back-img duration-150" :class="[isFocus ? 'scale-105':'']"/>&ndash;&gt;-->
        <!--                <div v-show="!isFocus" class="cover duration-150"/>-->
        <!--          <grid-item-->
        <!--              v-for="item in list"-->
        <!--              :x="item.x"-->
        <!--              :y="item.y"-->
        <!--              :w="item.w"-->
        <!--              :h="item.h"-->
        <!--              :i="item.i"-->
        <!--          >-->
        <!--            <div class="h-full" :class="[isDrag?'asdad':'']">-->
        <!--              <div v-show="item.i=='search'">-->
        <!--                <MySearch-->
        <!--                    :searchSetting="commonSettings.searchSetting"-->
        <!--                    :isFocus="isFocus"-->
        <!--                    :handleClickOpen="handleClickOpen"-->
        <!--                />-->
        <!--              </div>-->
        <!--              <div v-show="item.i=='time'">-->
        <!--                <MyTime :timeSetting="commonSettings.timeSetting"/>-->
        <!--              </div>-->
        <!--              <div v-show="item.i=='header'" class="flex-center h-full">-->
        <!--                <Header :commonSettings="commonSettings"/>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div v-if="isDrag" class="fixed top-0 left-0 t w-full h-full z-50"></div>-->
        <!--          </grid-item>-->
        <!--        </grid-layout>-->
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import {reactive, onMounted, watch, h, ref} from "vue";
import Header from "../components/header.vue";
import MyTime from '../components/my-time.vue'
import MySearch from '../components/my-search.vue'
import MyFooter from "../components/my-footer.vue";
import Shortcut from "../components/shortcut.vue";
import store from "store";
import _ from 'lodash'
import {ElMessage, ElNotification} from "element-plus";

//控制指示器
// indicator-position
const indicator = ref(true)


//整体数据格式

const data = reactive([
  {
    icon:'',
    name:'主页',
    layoutList:[], //


  }
])


// //grid测试
// const isDrag = ref(false)
//
//
// const list = ref(
//     [
//       {"x": 4, "y": 2, "w": 4, "h": 2, "i": "time"},
//       {"x": 4, "y": 3, "w": 4, "h": 2, "i": "search"},
//       {"x": 12, "y": 0, "w": 1, "h": 1, "i": "header"},
//     ],
// )
//
// const mdList =  ref(
//     [
//       {"x": 0, "y": 2, "w": 12, "h": 2, "i": "time"},
//       {"x": 0, "y": 3, "w": 12, "h": 2, "i": "search"},
//     ],
// )
//
// onMounted(() => {
//   if (commonSettings.baseSetting.showGreeting) {
//     ElNotification({
//       message: getGreetText(),
//       duration: 3000
//     })
//   }
// })
// const getGreetText = () => {
//   var dd = new Date();
//   var hour = dd.getHours();//获取当前时
//   if (hour > 0 && hour <= 6) {
//     return "还没休息啊，夜猫子，该休息了";
//   } else if (hour > 6 && hour <= 9) {
//     return "上午好";
//   } else if (hour > 9 && hour <= 12) {
//     return "早上好";
//   } else if (hour > 12 && hour <= 15) {
//     return "中午好";
//   } else if (hour > 15 && hour <= 18) {
//     return "下午好";
//   } else if (hour > 18 && hour <= 21) {
//     return "傍晚好";
//   } else if (hour > 21 && hour <= 24) {
//     return "晚上好";
//   }
// }
//
// const defaultSet = {
//   baseSetting: {
//     simpleFooter: false,
//     showGreeting: false
//   },
//   timeSetting: {
//     show: true,
//     date: true,
//     weight: true,
//     size: 40,
//     color: "#ffffff"
//   },
//   searchSetting: {
//     show: true,
//     height: 55,
//     radius: 15,
//     opacity: 100,
//     blank: true,
//   },
//   toolSetting: {
//     show: true,
//     size: 80,
//     radius: 15,
//     opacity: 100,
//     gapX: 30,
//     gapY: 30,
//     maxWidth: 900
//   },
// }
// const commonSettings = reactive(
//     store.get("commonSettings") ?
//         _.merge({}, defaultSet, store.get("commonSettings"))
//         :
//         {...defaultSet}
// )
//
// watch(commonSettings, (newData) => {
//   store.set("commonSettings", newData)
// })
//
// //输入框聚焦
// const isFocus = ref(false)
// const handleClickOpen = () => {
//   isFocus.value = true
// }
// const handleClickClose = () => {
//   isFocus.value = false
// }

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
  backdrop-filter: blur(10px);
  /*background-color: rgba(0, 0, 0, 0.15);*/
}

.cover {
  z-index: -10;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: .25s;
  background-image: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
}


.vue-grid-layout {

}

.asdad {
  border: 1px greenyellow dotted;
}

.vue-grid-item .resizing {
  opacity: 0.9;
}

.vue-grid-item .static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 100%;
  width: 100%;
}

.vue-grid-item .no-drag {
  height: 100%;
  width: 100%;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
  background-position: bottom right;
  padding: 0 8px 8px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: pointer;
}

:deep(.vue-resizable-handle) {
  z-index: 100 !important;
}

</style>