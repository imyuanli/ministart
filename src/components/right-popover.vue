<template>
  <div v-show="getShowDialog" :style="{left:left+'px',top:top+'px'}" class="contextmenu" @click.stop>
    <div class="menu edit-btn" @click="handleEdit">
      <el-icon class="menu-icon">
        <Edit/>
      </el-icon>
      <span>编辑</span>
    </div>
    <div class="menu delete-btn" @click="handleDelete">
      <el-icon class="menu-icon delete-color">
        <Delete/>
      </el-icon>
      <span class="delete-color">删除</span>
    </div>
  </div>
</template>

<script setup>
import {computed, watch} from "vue";
import {ElMessageBox} from "element-plus";
//接收的参数
const props = defineProps({
  rightVisible: Boolean,
  left: Number,
  top: Number,
})
//父组件传递过来的方法
const emit = defineEmits(['update:rightVisible', 'handleDelete', 'handleEdit', 'update:currentId'])
const closeDialog = () => {
  emit('update:rightVisible', false)
  emit('update:currentId', null)
}

//弹窗显示
const getShowDialog = computed({
  get: () => props.rightVisible,
  set: (val) => {
    emit('update:rightVisible', val)
  }
})

//删除
const handleDelete = () => {
  emit('handleDelete')
  closeDialog()
}

//编辑
const handleEdit = () => {
  emit('handleEdit')
  emit('update:rightVisible', false)
}

//全局监听
watch(getShowDialog, (newValue) => {
  if (newValue) {
    document.body.addEventListener('click', closeDialog)
  } else {
    document.body.removeEventListener('click', closeDialog)
  }
})
</script>

<style scoped>
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
</style>