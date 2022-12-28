<template>
  <div class="absolute left-1/2 -translate-x-1/2 top-64 tool-box">
    <div class="grid gap-2 md:gap-4 justify-items-center grid-cols-5 lg:grid-cols-9 md:grid-cols-7 sm:grid-cols-6">
      <div class="flex-center flex-col" @contextmenu.prevent="rightClick($event,items,index)">
        <div :class="['flex-center mb-1 customNav',showBackImg?'norm-customNav':'simple-customNav']">
          <el-icon class="icon-plus" style="">
            <Plus/>
          </el-icon>
        </div>
        <div :class="['text-black text-center text-sm overflow-ellipsis truncate w-1/2',getTextColor(showBackImg)]">
          翻译
        </div>
      </div>
      <div :class="['flex-center customNav',showBackImg?'norm-customNav':'simple-customNav']"
           @click="editDialogVisible = true">
        <el-icon class="icon-plus">
          <Plus/>
        </el-icon>
      </div>
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
import {ref, watch} from "vue";
import MyInput from '../components/my-input.vue'
import MyDialog from '../components/my-dialog.vue'
import {getTextColor} from '../utils/index.js'

defineProps({
  showBackImg: Boolean
})

const editDialogVisible = ref(false)
const handleEditChange = () => editDialogVisible.value = false

//右键弹窗
const visible = ref(false)
const top = ref(0)
const left = ref(0)

//打开
const rightClick = (e, item, index) => {
  top.value = e.pageY;
  left.value = e.pageX;
  visible.value = true;
}
//关闭
const closeMenu = () => {
  top.value = 0;
  left.value = 0;
  visible.value = false;
}
watch(visible, (newValue, oldValue) => {
  if (newValue) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
//添加网站捷径
const dialogVisible = ref(false)
</script>

<style scoped>
.tool-box {
  max-height: 45%;
  max-width: 800px;
  width: 95%;
  color: #fff;
  transition: .25s;
  overflow-y: auto;
}

.tool-box::-webkit-scrollbar {
  display: none;
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

.simple-customNav {
  background-color: #fff;
}

.simple-customNav:hover {
  background: rgba(0, 0, 0, .1);
}

.norm-customNav {
  background-color: rgba(255, 255, 255, .5);
  backdrop-filter: blur(40px) saturate(1.5) !important;
}

.norm-customNav:hover {
  background-color: rgb(215, 215, 215);
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