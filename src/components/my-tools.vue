<template>
  <div class="absolute left-1/2 -translate-x-1/2 top-80 navboxCustom">
    <div class="grid gap-2  md:gap-4 justify-items-center grid-cols-4 lg:grid-cols-9 md:grid-cols-7 sm:grid-cols-6">
      <div class="flex-center flex-col" @contextmenu.prevent="rightClick($event,items,index)">
        <div class="flex-center mb-1 customNav">
          <el-icon class="icon-plus" style="">
            <Plus/>
          </el-icon>
        </div>
        <div class="text-black text-center text-base overflow-ellipsis truncate w-1/2 mini-text-color">翻译</div>
      </div>
      <div class="flex-center customNav" @click="dialogVisible = true">
        <el-icon class="icon-plus" style="">
          <Plus/>
        </el-icon>
      </div>
    </div>
  </div>
  <div class="edit-dialog">
    <el-dialog
        title="编辑网站捷径"
        v-model="dialogVisible"
        width="30%"
        align-center
        class="rounded-lg"
    >
      <div class="flex justify-center items-start flex-col bg-white rounded-lg px-6 py-3 text-base info-text-color">
        <div class="py-3 flex justify-start items-center w-full">
          <div class="w-10">网址</div>
          <MyInput/>
        </div>
        <div class="py-3 flex justify-start items-center w-full">
          <div class="w-10">名称</div>
          <MyInput/>
        </div>
        <div class="py-3 flex justify-start items-center w-full">
          <div class="w-10">图标</div>
          <div class="edit-icon-box">
            <!--            <span v-if="isText" style="font-size:12px ">{{title.substring(0,5)}}</span>-->
            <img class="edit-icon" src="https://www.jianfast.com/static/home/images/defaultsicon/null.png" alt="">
          </div>
          <div class="edit-btn-box">
            <div class="edit-eng-btn" @click="getUrlIcon">
              智能
            </div>
            <div class="edit-eng-btn" @click="changeText">
              文字
            </div>
            <div class="edit-eng-btn" @click="changeDefault">
              默认
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="handleClose">取 消</el-button>
        <el-button v-if="!isUpdate" type="primary" @click="addShortcuts(false)" :loading="btnLoading">确 定</el-button>
        <el-button v-if="isUpdate" type="primary" @click="addShortcuts(true)" :loading="btnLoading">更 新</el-button>
      </template>
    </el-dialog>
  </div>
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

const shortcuts_list = [
  {
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶',
    disabled: true
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }]
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
.navboxCustom {
  max-height: 45%;
  max-width: 800px;
  width: 95%;
  color: #fff;
  transition: .25s;
  overflow-y: auto;
}

.navboxCustom::-webkit-scrollbar {
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

.customNav:hover {
  background: rgba(0, 0, 0, .1);
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


.dialog-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
}

.edit-dialog:deep(.el-dialog) {
  max-width: 600px;
  width: 90%;
  background-color: rgb(245, 245, 245) !important;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 5%) 0 10px 20px;
}

:deep(.el-dialog__body) {
  padding: 35px;
  max-height: 350px;
  overflow: auto;
}

:deep(.el-dialog__body) {
  padding: 15px 35px 0;
}

:deep(.el-dialog__body::-webkit-scrollbar) {
  display: none
}

/*屏幕小于768的时候*/
@media (max-width: 640px) {
  :deep(.el-dialog__body) {
    padding: 15px 20px 0;
  }
}


.my-input:focus {
  border-bottom: solid 1px #70C000;
}

.my-input {
  -webkit-appearance: none;
  box-sizing: border-box;
  display: inline-block;
  font-size: inherit;
  height: 20px;
  line-height: 20px;
  outline: 0;
  padding: 0;
  width: 95%;
  border: none;
  border-radius: 0;
  border-bottom: solid 1px rgba(0, 0, 0, .1);
  color: black;
  background-color: white;
  transition: .25s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.edit-icon-box {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #cccccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.edit-icon {
  width: 35px;
  height: 35px;
}

.edit-btn-box {
  width: 70%;
  display: flex;
  align-items: center;
}

.edit-eng-btn {
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