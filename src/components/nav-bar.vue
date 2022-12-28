<template>
  <div class="absolute top-6 right-6 flex-center">
    <el-popover
        placement="bottom-start"
        trigger="click"
        style="max-width: calc(100% - 20px)"
        :hide-after="50"
    >
      <template #reference>
        <el-icon :class="['btn-icon mr-3',getTextColor(commonSetting.showBackImg)]">
          <User/>
        </el-icon>
      </template>
      <div>
        <div class="lip-btn" @click="infoDialogVisible = true">
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
        <el-icon :class="['btn-icon hover:rotate-180 duration-200',getTextColor(commonSetting.showBackImg)]">
          <Setting/>
        </el-icon>
      </template>
      <div>
        <div class="lip-btn" @click="commonDialogVisible = true">常规设置</div>
        <div class="lip-btn" @click="pictureDialogVisible = true">壁纸设置</div>
        <div class="lip-btn" @click="searchDialogVisible = true">搜索引擎设置</div>
        <el-divider style="margin: 5px"/>
        <div class="lip-btn">捐助</div>
        <div class="lip-btn">帮助和反馈</div>
        <el-divider style="margin: 5px"/>
        <div class="lip-btn">设为主页</div>
      </div>
    </el-popover>
  </div>
  <!--  info-->
  <MyDialog
      :dialogVisible="infoDialogVisible"
      :handleChang="handleInfoChange"
  >
    <template #title>
      欢迎您，<span class="primary-color">鸢离</span>
    </template>
    <template #content>
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
    </template>
  </MyDialog>
  <!-- 常规设置 -->
  <MyDialog
      :dialogVisible="commonDialogVisible"
      :handleChang="handleCommonChange"
  >
    <template #title>
      常规设置
    </template>
    <template #content>
      <div class="bg-white rounded-lg px-6 py-3">
        <div v-for="(item,index) in Object.keys(commonSetting)" :key="index" class="flex justify-between py-3">
          <div>
            {{ commonSettingText[item] }}
          </div>
          <div>
            <el-switch v-model="commonSetting[item]"/>
          </div>
        </div>
      </div>
    </template>
  </MyDialog>
  <!-- 壁纸设置 -->
  <MyDialog
      :dialogVisible="pictureDialogVisible"
      :handleChang="handlePictureChange"
  >
    <template #title>
      壁纸设置
    </template>
    <template #content>
      12312321
    </template>
  </MyDialog>
  <!-- 搜索设置 -->
  <MyDialog
      :dialogVisible="searchDialogVisible"
      :handleChang="handleSearchChange"
  >
    <template #title>
      搜索设置
    </template>
    <template #content>
      12312321
    </template>
  </MyDialog>
</template>
<script setup>
import {reactive, ref, watch} from 'vue'
import MyInput from "./my-input.vue";
import MyDialog from "./my-dialog.vue";
import {getTextColor} from '../utils/index.js'

//
const props = defineProps({
  commonSetting: Object
})

//个人信息
const infoDialogVisible = ref(false)
const handleInfoChange = () => infoDialogVisible.value = false
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

//常规设置
const commonDialogVisible = ref(false)
const handleCommonChange = () => commonDialogVisible.value = false

const commonSettingText = reactive({
  showTime: {
    text: "是否显示时间",
    tips: ''
  },
  showWord: {
    text: "是否显示一言",
    tips: ''
  },
  showShortcut: {
    text: "是否显示快捷方式",
    tips: ''
  },
  showBackImg: {
    text: "是否显示背景图片",
    tips: '显示图片后将变成滤镜模式'
  },
  showFooter: {
    text: "是否显示footer",
    tips: ''
  },
})
watch(props, (newData, oldData) => {
  console.log(newData)
})

//壁纸弹窗
const pictureDialogVisible = ref(false)
const handlePictureChange = () => pictureDialogVisible.value = false
//搜索弹窗
const searchDialogVisible = ref(false)
const handleSearchChange = () => searchDialogVisible.value = false
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