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
           @contextmenu.prevent="rightClick($event,index)"
           @touchstart.prevent="touchStart($event,index)"
           @touchmove="touchMove()"
           @touchend="touchEnd()"
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
            <span class="text-black" v-if="item.type==='text'">{{ item.src }}</span>
          </div>
        </div>
        <div class="text-center text-sm mt-1 overflow-ellipsis truncate w-full">{{ item.name }}</div>
      </div>
      <div class="tool-item"
           :style="{
               padding: `0 ${gapX/2}px ${gapY}px`,
               width:`${size + gapY}px`,
               height:`${size+ gapY}px`
            }"
      >
        <div class="flex-center flex-col w-full h-full"
             @click="handleEditOpen"
        >
          <div
              class="bg-white rounded-md cursor-pointer w-full h-full flex-center  p-1"
              :style="{opacity:opacity/100,borderRadius:`${radius}px`}"
          >
            <div class="bg-blue-400 flex-center rounded-full">
              <el-icon :style="{fontSize: `${size-5}px`}">
                <CirclePlus/>
              </el-icon>
            </div>
          </div>
        </div>
        <div class="flex-center text-sm mt-1">添加</div>
      </div>
    </div>
  </div>
  <MyDialog
      :dialogVisible="editDialogVisible"
      :handleChang="handleEditClose"
  >
    <template #title>
      快捷导航设置
    </template>
    <template #content>
      <div v-loading="loading" class="flex justify-center items-start flex-col bg-white rounded-lg px-6 py-3 text-base prefix-text-color">
        <div class="py-3 shortcut-box">
          <div>名称</div>
          <MyInput v-model="toolObj.name"/>
        </div>
        <div class="py-3 shortcut-box">
          <div>网址</div>
          <MyInput v-model="toolObj.url"/>
        </div>
        <div class="py-3 shortcut-box">
          <div class="flex-none">图标</div>
          <div class="flex-center ml-3">
            <div class="shortcut-icon-box">
              <div v-if="toolObj.type==='text'">{{ toolObj.src }}</div>
              <img v-if="toolObj.type==='icon'" class="shortcut-icon" :src="toolObj.src" alt="">
            </div>
            <div class="ml-3 flex flex-wrap justify-start">
              <div class="m-1">
                <el-button round @click="getIcon">智能</el-button>
              </div>
              <div class="m-1">
                <el-button round @click="getText">文字</el-button>
              </div>
              <el-button class="m-1"  @click="getDefault" round>默认</el-button>
            </div>
          </div>
        </div>
        <div class="py-3 w-full flex flex-col">
          <div class="shortcut-box">
            <div class="flex-none">布局</div>
            <div class="ml-3">
              <el-radio-group v-model="toolObj.grid">
                <el-radio :label="'1x1'">1x1</el-radio>
                <el-radio :label="'1x2'">1x2</el-radio>
                <el-radio :label="'2x1'">2x1</el-radio>
                <el-radio :label="'2x2'">2x2</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="text-xs text-gray-400">1x2表示图标将占一行两列</div>
        </div>
      </div>
    </template>
    <template #bottom>
      <el-button @click="handleEditClose">取 消</el-button>
      <el-button v-if="currentIndex === null" type="primary" @click="handleSaveTool">确 定</el-button>
      <el-button v-if="currentIndex !== null" type="primary" @click="handleUpdateTool">更 新</el-button>
    </template>
  </MyDialog>
  <div v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
    <div class="menu edit-btn" @click="handleEditTool">
      <el-icon class="menu-icon">
        <Edit/>
      </el-icon>
      <span>编辑</span>
    </div>
    <div class="menu delete-btn" @click="handleDelTool">
      <el-icon class="menu-icon delete-color">
        <Delete/>
      </el-icon>
      <span class="delete-color">删除</span>
    </div>
  </div>
</template>
<script setup>
import {reactive, ref, toRefs, watch} from "vue";
import MyInput from '../components/my-input.vue'
import MyDialog from '../components/my-dialog.vue'
import {ElMessage} from "element-plus";
import store from 'store'
import {get_url_icon} from "../service/service.js";

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

//快捷方式
const toolObj = reactive({
      name: "",
      url: "",
      src: "https://www.jianfast.com/static/home/images/defaultsicon/null.png",
      type: "icon",
      grid: "1x1"
    }
)

//快捷导航arr
const toolsArr = reactive(store.get("toolsArr") ?
    store.get("toolsArr")
    :
    []
)

const loading=ref(false)

//获取网站图标
const getIcon = () => {
  if (!toolObj?.url) {
    ElMessage({
      message: '请先填写网址',
      type: 'warning',
    })
    return
  }
  loading.value = true
  get_url_icon({url:toolObj?.url}).then(
      (res)=>{
       if(res){
         toolObj.src = res
         toolObj.type = 'icon'
         loading.value = false
       }
    }
  )
}
//图标是文字
const getText = () => {
  if (!toolObj?.name) {
    ElMessage({
      message: '请先填写网站名称',
      type: 'warning',
    })
    return
  }
  toolObj.src = toolObj?.name[0]
  toolObj.type = 'text'
}
//默认
const getDefault=()=>{
  toolObj.src = 'https://www.jianfast.com/static/home/images/defaultsicon/null.png'
  toolObj.type = 'icon'
}
//重置toolobj
const clearObj = () => {
  toolObj.name = ""
  toolObj.url = ""
  toolObj.src = "https://www.jianfast.com/static/home/images/defaultsicon/null.png"
  toolObj.type = "icon"
  toolObj.grid = "1x1"
}

//保存
const handleSaveTool = () => {
  if (!toolObj?.name) {
    ElMessage({
      message: '未填写名称',
      type: 'warning',
    })
    return
  }
  if (!toolObj?.url) {
    ElMessage({
      message: '未填写网址',
      type: 'warning',
    })
    return
  }
  toolsArr.push({...toolObj})
  clearObj()
  handleEditClose()
}
//更新
const handleUpdateTool = () => {
  if (!toolObj?.name) {
    ElMessage({
      message: '未填写名称',
      type: 'warning',
    })
    return
  }
  if (!toolObj?.url) {
    ElMessage({
      message: '未填写网址',
      type: 'warning',
    })
    return
  }
  toolsArr[currentIndex.value] = {...toolObj}
  clearObj()
  handleEditClose()
}

//编辑
const handleEditTool = () => {
  let obj = {...toolsArr[currentIndex.value]}
  toolObj.name = obj.name
  toolObj.url = obj.url
  toolObj.src = obj.src
  toolObj.type = obj.type
  toolObj.grid = obj.grid
  handleEditOpen()
}

//删除 tool
const handleDelTool = () => {
  toolsArr.splice(currentIndex.value, 1)
}
//持久化存储
watch(toolsArr, (newTool) => {
  store.set("toolsArr", newTool)
})

//编辑弹框
const editDialogVisible = ref(false)
const handleEditOpen = () => editDialogVisible.value = true
const handleEditClose = () => {
  editDialogVisible.value = false
  currentIndex.value = null
  clearObj()
}

//右键弹窗
const visible = ref(false)
const top = ref(0)
const left = ref(0)

//当前操作的index
const currentIndex = ref(null)
//打开menu
const openMenu = (x, y) => {
  left.value = x;
  top.value = y - 60;
  visible.value = true;
}
//右键打开
const rightClick = (e, index) => {
  openMenu(e.pageX, e.pageY)
  currentIndex.value = index
}
//关闭
const closeMenu = () => {
  top.value = 0;
  left.value = 0;
  visible.value = false;
  // currentIndex.value = null
}
//移动端长按
let timeOutEvent
//长按事件（起始）
const touchStart = (e, index) => {
  timeOutEvent = setTimeout(() => {
    //真正长按后应该执行的内容
    timeOutEvent = 0;
    const touches = e.touches[0]
    currentIndex.value = index
    openMenu(touches.pageX, touches.pageY)
  }, 500); //这里设置定时器，定义长按500毫秒触发长按事件
  return false;
}
//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
const touchEnd = () => {
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
  max-height: 55%;
  width: 100%;
  color: #fff;
  transition: .25s;
  overflow-y: auto;
}

/*屏幕小于768的时候*/
@media (max-width: 640px) {
  .tool-box {
    max-height: 45%;
  }
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
  width: 100%;
}

.tool-item {
  list-style-type: none;
  position: relative;
  height: 100%;
  box-sizing: border-box;
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
</style>