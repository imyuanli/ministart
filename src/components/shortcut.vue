<template>
  <div
      v-if="show"
      class="tool-box"
      :style="{maxWidth:`${maxWidth}px`}"
  >
    <div
        class="tool-grid"
        :style="{
              gridTemplateColumns:`repeat(auto-fill,${size+gapY}px)`,
              gridTemplateRows:`repeat(auto-fill,${size+gapX}px)`,
         }"
    >
      <div class="tool-item"
           v-for="(item,index) in toolsArr"
           :style="{
               padding: `0 ${gapX/2}px ${gapY}px`,
               gridColumn: `span ${item.grid.split('x')[1]}`,
               gridRow: `span ${item.grid.split('x')[0]}`,
               width:`${size*item.grid.split('x')[1] + gapY*item.grid.split('x')[1]}px`,
               height:`${size*item.grid.split('x')[0]+ gapY*item.grid.split('x')[0]}px`
            }"
           :key="index"
      >
        <div class="flex-center flex-col w-full h-full">
          <div
              class="bg-white rounded-md cursor-pointer w-full h-full flex-center p-1"
              :style="{opacity:opacity/100,borderRadius:`${radius}px`}"
          >
            <img
                class="w-full h-full"
                :class="[item.grid === '2x1'|| item.grid === '1x2'?'object-contain':'object-cover']"
                v-if="item.type==='icon'"
                :src="item.src"
                :alt="item.name"
                :style="{borderRadius:`${radius}px`}"
            >
<!--            <span v-if="item.type==='text'" class="text-black text-xl">{{ item.src }}</span>-->
          </div>
        </div>
        <div class="flex-center text-sm">{{ item.name }}</div>
      </div>
      <!--      <div class="flex-center flex-col">-->
      <!--        <div class="flex-center mb-1 customNav">-->
      <!--          <img src="https://files.codelife.cc/icons/taobao.svg" alt="">-->
      <!--        </div>-->
      <!--        <div class="text-black text-center text-sm overflow-ellipsis truncate w-1/2">-->
      <!--          翻译-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div :class="['flex-center customNav']"-->
      <!--           @click="editDialogVisible = true">-->
      <!--        <el-icon class="icon-plus">-->
      <!--          <Plus/>-->
      <!--        </el-icon>-->
      <!--      </div>-->
    </div>
  </div>
  <MyDialog
      :dialogVisible="editDialogVisible"
      :handleChang="handleEditChange"
  >
    <template #title>
      网站捷径设置
    </template>
    <template #content>
      <div class="flex justify-center items-start flex-col bg-white rounded-lg px-6 py-3 text-base prefix-text-color">
        <div class="py-3 shortcut-box">
          <div class="w-10">网址</div>
          <MyInput/>
        </div>
        <div class="py-3 shortcut-box">
          <div class="w-10">名称</div>
          <MyInput/>
        </div>
        <div class="py-3 shortcut-box">
          <div class="w-10">图标</div>
          <div class="shortcut-icon-box">
            <img class="shortcut-icon" src="https://www.jianfast.com/static/home/images/defaultsicon/null.png" alt="">
          </div>
          <div class="shortcut-btn-box">
            <div class="shortcut-btn">
              智能
            </div>
            <div class="shortcut-btn">
              文字
            </div>
            <div class="shortcut-btn">
              默认
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #bottom>
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
      <el-button type="primary">更 新</el-button>
    </template>
  </MyDialog>
  <div v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
    <div class="menu edit-btn">
      <el-icon class="menu-icon">
        <Edit/>
      </el-icon>
      <span>编辑</span>
    </div>
    <div class="menu delete-btn">
      <el-icon class="menu-icon delete-color">
        <Delete/>
      </el-icon>
      <span class="delete-color">删除</span>
    </div>
  </div>
</template>
<script setup>
import {ref, toRefs, watch} from "vue";
import MyInput from '../components/my-input.vue'
import MyDialog from '../components/my-dialog.vue'

const props = defineProps({
  toolSetting: Object
})

const {
  show,
  size,
  radius,
  opacity,
  gapX,
  gapY,
  maxWidth
} = toRefs(props.toolSetting)

const toolsArr = [
  {
    name: "秘塔2",
    src: "https://www.jianfast.com/static/home/images/defaultsicon/null.png",
    type: "icon",
    url: "https://xiezuocat.com/#/?s=itab",
    grid: '1x1'
  },
  {
    name: "秘塔2",
    src: "https://www.jianfast.com/static/home/images/defaultsicon/null.png",
    type: "icon",
    url: "https://xiezuocat.com/#/?s=itab",
    grid: '2x1'
  },
  {
    name: "秘塔2",
    src: "https://www.jianfast.com/static/home/images/defaultsicon/null.png",
    type: "icon",
    url: "https://xiezuocat.com/#/?s=itab",
    grid: '1x2'
  },
  {
    name: "秘塔2",
    src: "https://www.jianfast.com/static/home/images/defaultsicon/null.png",
    type: "icon",
    url: "https://xiezuocat.com/#/?s=itab",
    grid: '2x2'
  }
]
//编辑弹框
const editDialogVisible = ref(false)
const handleEditChange = () => editDialogVisible.value = false

//右键弹窗
const visible = ref(false)
const top = ref(0)
const left = ref(0)

//打开menu
const openMenu = (x, y) => {
  left.value = x;
  top.value = y - 60;
  visible.value = true;
}
//右键打开
const rightClick = (e) => {
  openMenu(e.pageX, e.pageY)
}
//关闭
const closeMenu = () => {
  top.value = 0;
  left.value = 0;
  visible.value = false;
}
//移动端长按
let timeOutEvent
//长按事件（起始）
const touchStart = (e) => {
  timeOutEvent = setTimeout(() => {
    //真正长按后应该执行的内容
    timeOutEvent = 0;
    const touches = e.touches[0]
    openMenu(touches.pageX, touches.pageY)
  }, 500); //这里设置定时器，定义长按500毫秒触发长按事件
  return false;
}
//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
const touchEnd = (item) => {
  clearTimeout(timeOutEvent); //清除定时器
  if (timeOutEvent !== 0) {
    //这里写要执行的内容（如onclick事件）
    console.log("点击但未长按");
  }
  return false;
}
//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
const touchMove = () => {
  clearTimeout(timeOutEvent); //清除定时器
  timeOutEvent = 0;
}

watch(visible, (newValue, oldValue) => {
  if (newValue) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style scoped>
.tool-box {
  max-height: 45%;
  width: 95%;
  color: #fff;
  transition: .25s;
  overflow-y: auto;
}

.tool-box::-webkit-scrollbar {
  display: none;
}

.tool-grid {
  position: relative;
  display: grid;
  user-select: none;
  grid-auto-flow: dense;
  box-sizing: border-box;
  justify-content: center;
}

.tool-item {
  list-style-type: none;
  position: relative;
  height: 100%;
  box-sizing: border-box;
}

.box {
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.customNav {
  width: 70px;
  height: 70px;
  margin: 5px;
  border-radius: 15px;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  transition: background-color .35s;
}

.customNav:hover {
  background: rgb(235, 235, 235);
}

/*屏幕小于768的时候*/
@media (max-width: 640px) {
  .customNav {
    width: 60px;
    height: 60px;
  }
}

.icon-plus {
  color: rgba(0, 0, 0, .5);
  font-size: 32px;
}

.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  min-width: 120px;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgb(0 0 0 / 25%);
  transition: .25s cubic-bezier(0.65, 0.05, 0.1, 1);
  overflow: hidden;

}

.menu {
  padding: 10px 15px;
  border-radius: 5px;
  color: black;
  font-size: 12px;
  transition: .25s;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.edit-btn:hover {
  background-color: rgba(0, 0, 0, .1);
}

.menu-icon {
  margin-right: 5px;
  font-size: 14px;
}

.delete-btn:hover {
  background: rgba(255, 75, 104, .1);
}

.delete-color {
  color: #FF4B68;
}


.shortcut-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.shortcut-icon-box {
  min-width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid #cccccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.shortcut-icon {
  width: 35px;
  height: 35px;
}

.shortcut-btn-box {
  width: 70%;
  display: flex;
  align-items: center;
}

.shortcut-btn {
  font-size: 14px;
  color: #4d4d4d;
  width: 100%;
  border-radius: 50px;
  text-align: center;
  border: 1px solid #f2f2f2;
  margin: 5px;
  cursor: pointer;
  padding: 3px;
  background-color: #f2f2f2;
}
</style>