<template>
  <div class="absolute left-1/2 -translate-x-1/2  top-60 navboxCustom">
    <div class="grid gap-2  md:gap-4 justify-items-center grid-cols-4 lg:grid-cols-8 md:grid-cols-7 sm:grid-cols-6">
      <div class="flex-center flex-col" @contextmenu.prevent="rightClick($event,items,index)">
        <div class="flex-center mb-1 customNav">
          <el-icon class="icon-plus" style="">
            <Plus/>
          </el-icon>
        </div>
        <div class="text-white text-center text-sm lg:text-lg md:text-base overflow-ellipsis truncate w-1/2">翻译</div>
      </div>
      <!--      <el-tooltip-->
      <!--          class="box-item"-->
      <!--          effect="light"-->
      <!--          content="添加网站捷径"-->
      <!--          placement="bottom"-->
      <!--      >-->
      <!--       -->
      <!--      </el-tooltip>-->
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
      <div class="flex justify-center items-start flex-col bg-white rounded-lg px-6 py-3 text-base">
        <div class="py-3 flex-center">
          <div class="mr-3">网址</div>
          <MyInput/>
        </div>
        <div class="py-3 flex-center">
          <div class="mr-3">网址</div>
          <MyInput/>
        </div>
      </div>
      <template #footer></template>
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
import {ref} from "vue";
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

const rightClick = (e, item, index) => {
  top.value = e.pageY;
  left.value = e.pageX;
  visible.value = true;
}

//添加网站捷径
const dialogVisible = ref(false)
</script>

<style scoped>
.navboxCustom {
  height: 45%;
  max-width: 800px;
  width: 90%;
  color: #fff;
  transition: .25s;
  overflow-y: auto;
}

.navboxCustom::-webkit-scrollbar {
  display: none;
}

.customNav {
  width: 80px;
  height: 80px;
  margin: 5px;
  border-radius: 15px;
  text-align: center;
  background-color: rgba(255, 255, 255, .1);
  cursor: pointer;
  transition: background-color .35s;
  backdrop-filter: blur(40px) saturate(1.5);
}

@media (max-width: 1024px) {
  .customNav {
    width: 75px;
    height: 75px;
  }
}

@media (max-width: 768px) {
  .customNav {
    width: 70px;
    height: 70px;
  }
}

/*屏幕小于768的时候*/
@media (max-width: 640px) {
  .customNav {
    width: 60px;
    height: 60px;
  }
}


.icon-plus {
  color: rgba(255, 255, 255, .5);
  font-size: 32px;
}


.customNav:hover {
  background: rgba(255, 255, 255, .5);
}

.customNav:hover .icon-plus {
  color: rgba(0, 0, 0, .5);
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
</style>