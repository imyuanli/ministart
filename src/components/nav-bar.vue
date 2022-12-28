<template>
  <div class="absolute top-6 right-6 flex-center">
    <el-popover
        placement="bottom-start"
        trigger="click"
        style="max-width: calc(100% - 20px)"
        :hide-after="50"
    >
      <template #reference>
        <el-icon class="btn-icon mr-3 mini-text-color">
          <User/>
        </el-icon>
      </template>
      <div>
        <div class="lip-btn" @click="centerDialogVisible = true">
          <span class="block text-lg primary-color truncate overflow-ellipsis mb-1">鸢离鸢离鸢离鸢离鸢离鸢离</span>
          <span>账号管理</span>
        </div>
        <div class="lip-btn">退出登录</div>
      </div>
    </el-popover>
    <el-popover
        placement="bottom-start"
        trigger="click"
        style="max-width: calc(100% - 20px)"
        :hide-after="50"
    >
      <template #reference>
        <el-icon class="btn-icon hover:rotate-180 duration-200 mini-text-color">
          <Setting/>
        </el-icon>
      </template>
      <div>
        <div class="lip-btn">常规设置</div>
        <div class="lip-btn">壁纸设置</div>
        <div class="lip-btn">搜索引擎设置</div>
        <el-divider style="margin: 5px"/>
        <div class="lip-btn">捐助</div>
        <div class="lip-btn">帮助和反馈</div>
        <el-divider style="margin: 5px"/>
        <div class="lip-btn">设为主页</div>
      </div>
    </el-popover>
  </div>
  <div class="dialog-box">
    <el-dialog
        v-model="centerDialogVisible"
        width="30%"
        align-center
        class="rounded-lg"
    >
      <template #header="{ close, titleId, titleClass }">
        <div class="text-2xl text-black font-semibold truncate overflow-ellipsis">
          欢迎您，<span class="primary-color">鸢离</span>
        </div>
      </template>
      <div class="bg-white rounded-lg px-6 py-3">
        <div v-for="(item,index) in info" :key="index" class="flex justify-between py-3">
          <div class="flex-center">
            <div class="info-text-color">{{ item.name }}</div>
            <div v-show="index !== currentIndex" class="text-black ml-6">{{ item.value }}</div>
            <div v-show="index == currentIndex">
              <MyInput/>
            </div>
          </div>
          <div class="flex-center">
            <div v-if="item.type == 'copy'">
              <el-icon class="info-icon handle-icon">
                <CopyDocument/>
              </el-icon>
            </div>
            <div v-else-if="item.type =='edit'">
              <el-icon @click="handleChange(index,item.value)"
                       class="info-icon handle-icon"
                       v-show="index !== currentIndex"
              >
                <Edit/>
              </el-icon>
              <div class="save-btn" v-show="index == currentIndex">
                保存
              </div>
            </div>
            <div v-else>
              <el-icon class="info-icon handle-icon">
                <View/>
              </el-icon>
            </div>
          </div>
        </div>
      </div>
      <template #footer></template>
    </el-dialog>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import MyInput from "./my-input.vue";
//对话框
const centerDialogVisible = ref(false)
const info = [
  {
    name: "UID",
    value: '2865437316qphijt',
    type: 'copy'
  },
  {
    name: "邮箱",
    value: '2865437316@qq.com',
    type: 'edit'
  },
  {
    name: "昵称",
    value: '鸢离',
    type: 'edit'
  },
  {
    name: "生日",
    value: '',
    type: 'edit'
  },
  {
    name: "注册时间",
    value: '2021-03-05',
    type: ''
  },
]
//编辑
const currentIndex = ref(null)
//更新的值
const inputValue = ref(null)
const handleChange = (index, value) => {
  //每次更新前清空之前
  currentIndex.value = null
  inputValue.value = null
  //赋值
  currentIndex.value = index
  inputValue.value = value
}
</script>

<style scoped>
.btn-icon {
  font-size: 22px;
  cursor: pointer;
}

.lip-btn {
  padding: 10px 15px;
  border-radius: 5px;
  color: black;
  font-size: 12px;
  transition: .25s;
  cursor: pointer;
  font-family: "PingFang SC", "Microsoft Yahei", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.lip-btn:hover {
  background-color: rgba(0, 0, 0, .1);
}

.dialog-box:deep(.el-dialog) {
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

.info-icon {
  color: rgba(0, 0, 0, .35);
  font-size: 16px;
  margin-right: 3px;
}

.info-text {
  color: rgba(0, 0, 0, .35);
}

.handle-icon {
  cursor: pointer;
}

.handle-icon:hover {
  color: #409eff;
}

.my-input:focus {
  border-bottom: solid 1px #409eff;
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

.save-btn {
  color: #409eff;
  font-size: 13px;
}
</style>