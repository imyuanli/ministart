<template>
  <div class="absolute top-6 right-6 flex-center">
<!--    <el-popover-->
<!--        placement="bottom-start"-->
<!--        trigger="click"-->
<!--        style="max-width: calc(100% - 20px)"-->
<!--        :hide-after="50"-->
<!--    >-->
<!--      <template #reference>-->
<!--        <el-icon :class="['nav-bar mr-3',getTextColor(commonSetting['showBackImg'])]">-->
<!--          <User/>-->
<!--        </el-icon>-->
<!--      </template>-->
<!--      <div>-->
<!--        <div class="lip-btn" @click="infoDialogVisible = true">-->
<!--          <span class="block text-lg primary-color truncate overflow-ellipsis mb-1">鸢离鸢离鸢离鸢离鸢离鸢离</span>-->
<!--          <span>账号管理</span>-->
<!--        </div>-->
<!--        <div class="lip-btn">退出登录</div>-->
<!--      </div>-->
<!--    </el-popover>-->
    <el-popover
        placement="bottom-start"
        trigger="click"
        style="max-width: calc(100% - 20px)"
        :hide-after="50"
    >
      <template #reference>
        <el-icon :class="['nav-bar hover:rotate-180 duration-200']">
          <Setting/>
        </el-icon>
      </template>
      <div>
        <div class="lip-btn" @click="commonDialogVisible = true">常规设置</div>
        <el-divider style="margin: 5px"/>
        <div class="lip-btn">捐助</div>
        <div class="lip-btn">帮助和反馈</div>
        <el-divider style="margin: 5px"/>
        <div class="lip-btn">设为主页</div>
      </div>
    </el-popover>
  </div>
<!--  &lt;!&ndash;  info&ndash;&gt;-->
<!--  <MyDialog-->
<!--      :dialogVisible="infoDialogVisible"-->
<!--      :handleChang="handleInfoChange"-->
<!--  >-->
<!--    <template #title>-->
<!--      欢迎您，<span class="primary-color">鸢离</span>-->
<!--    </template>-->
<!--    <template #content>-->
<!--      <div class="bg-white rounded-lg px-6 py-3">-->
<!--        <div v-for="(item,index) in info" :key="index" class="flex justify-between py-3">-->
<!--          <div class="flex-center">-->
<!--            <div class="prefix-text-color">{{ item.name }}</div>-->
<!--            <div v-show="index !== currentIndex" class="text-black ml-6">{{ item.value }}</div>-->
<!--            <div v-show="index == currentIndex">-->
<!--              <MyInput/>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="flex-center">-->
<!--            <div v-if="item.type == 'copy'">-->
<!--              <el-icon class="suffix-icon handle-icon">-->
<!--                <CopyDocument/>-->
<!--              </el-icon>-->
<!--            </div>-->
<!--            <div v-else-if="item.type =='edit'">-->
<!--              <el-icon-->
<!--                  @click="handleChange(index,item.value)"-->
<!--                  class="suffix-icon handle-icon"-->
<!--                  v-show="index !== currentIndex"-->
<!--              >-->
<!--                <Edit/>-->
<!--              </el-icon>-->
<!--              <div class="save-btn" v-show="index == currentIndex">-->
<!--                保存-->
<!--              </div>-->
<!--            </div>-->
<!--            <div v-else>-->
<!--              <el-icon class="suffix-icon handle-icon">-->
<!--                <View/>-->
<!--              </el-icon>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->
<!--  </MyDialog>-->
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
        <div v-for="(item,index) in Object.keys(commonSettings)" :key="index" class="flex justify-between py-3">
          <div>
            <div class="text-md text-black">
              {{ commonSettingText[item].intro }}
            </div>
            <div class="text-xs text-gray-400">
              {{ commonSettingText[item]?.tips }}
            </div>
          </div>
          <div>
            <el-switch  v-model="commonSettings[item]"/>
          </div>
        </div>
      </div>
    </template>
  </MyDialog>
</template>
<script setup>
import {reactive, ref} from 'vue'
import MyInput from "./my-input.vue";
import MyDialog from "./my-dialog.vue";
defineProps({
  commonSettings:Object
})
const commonSettingText=reactive({
  showTime:{
    intro:"是否显示时间",
    tips:"",
  },
  showShortcut:{
    intro:"是否显示快捷方式",
    tips:"",
  },
  showFooter:{
    intro:"是否显示底部版权信息",
    tips:"",
  },
  showBackImg:{
    intro:"是否显示背景图片",
    tips:"",
  },
})


// //个人信息
// const infoDialogVisible = ref(false)
// const handleInfoChange = () => infoDialogVisible.value = false
// const info = [
//   {
//     name: "UID",
//     value: '2865437316qphijt',
//     type: 'copy'
//   },
//   {
//     name: "邮箱",
//     value: '2865437316@qq.com',
//     type: 'edit'
//   },
//   {
//     name: "昵称",
//     value: '鸢离',
//     type: 'edit'
//   },
//   {
//     name: "生日",
//     value: '',
//     type: 'edit'
//   },
//   {
//     name: "注册时间",
//     value: '2021-03-05',
//     type: ''
//   },
// ]
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

</script>

<style scoped>
.nav-bar {
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

.suffix-icon {
  color: rgba(0, 0, 0, .35);
  font-size: 16px;
  margin-right: 3px;
}

.handle-icon {
  cursor: pointer;
}

.handle-icon:hover {
  color: #409eff;
}

.save-btn {
  color: #409eff;
  font-size: 13px;
}
</style>