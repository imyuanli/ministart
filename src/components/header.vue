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
        <el-icon :class="['nav-bar hover:rotate-180 duration-500']">
          <Setting/>
        </el-icon>
      </template>
      <div>
        <div class="lip-btn" @click="commonDialogVisible = true">常规设置</div>
        <!--        <el-divider style="margin: 5px"/>-->
        <!--        <div class="lip-btn">捐助</div>-->
        <!--        <div class="lip-btn">帮助和反馈</div>-->
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
      <SettingPanel>
        <template #panel-title>
          时间/日期
        </template>
        <template #panel-content>
          <div v-for="(item,index) in Object.keys(commonSettings.timeSetting)" :key="index">
            <div class="flex justify-between py-3">
              <div class="flex-1">
                <div class="text-md text-black">
                  {{ setInfo[item].intro }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ setInfo[item]?.tips }}
                </div>
              </div>
              <div class="flex-1 flex justify-end items-center">
                <el-switch
                    v-if="setInfo[item].type==='switch'"
                    v-model="commonSettings.timeSetting[item]"
                />
                <el-slider
                    v-if="setInfo[item].type==='slider'"
                    v-model="commonSettings.timeSetting[item]"
                    class="w-full"
                    :min="setInfo[item].min"
                    :max="setInfo[item].max"
                />
                <el-select
                    v-if="setInfo[item].type==='select'"
                    v-model="commonSettings.timeSetting[item]"
                >
                  <el-option
                      v-for="item in setInfo[item].options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  />
                </el-select>
                <el-color-picker
                    v-if="setInfo[item].type==='picker'"
                    v-model="commonSettings.timeSetting[item]"
                />
              </div>
            </div>
          </div>
        </template>
      </SettingPanel>
    </template>
  </MyDialog>
</template>
<script setup>
import {reactive, ref} from 'vue'
import SettingPanel from "./setting-panel.vue";
import MyDialog from "./my-dialog.vue";

defineProps({
  commonSettings: Object
})


const setInfo = reactive({
  time: {
    intro: "是否显示时间",
    tips: "",
    type: "switch",
  },
  hover24: {
    intro: "是否显示24小时制",
    tips: "",
    type: "switch",
  },
  month: {
    intro: "是否显示年月日",
    tips: "",
    type: "switch",
  },
  week: {
    intro: "是否显示星期",
    tips: "",
    type: "switch",
  },
  lunar: {
    intro: "是否显示农历",
    tips: "",
    type: "switch",
  },
  second: {
    intro: "是否显示秒数",
    tips: "",
    type: "switch",
  },
  weight: {
    intro: "是否显示粗体时间",
    tips: "该项仅会控制时间，不会控制日期该项仅会控制时间，不会控制日期该项仅会控制时间，不会控制日期该项仅会控制时间，不会控制日期",
    type: "switch",
  },
  size: {
    intro: "选择字体大小",
    tips: "该项仅会控制时间，不会控制日期",
    type: "slider",
    min: 30,
    max: 60,
  },
  family: {
    intro: "选择时间字体",
    tips: "",
    type: "select",
    options: [
      {
        value: 'Option1',
        label: 'Option1',
      },
      {
        value: 'Option2',
        label: 'Option2',
      },
      {
        value: 'Option3',
        label: 'Option3',
      },
      {
        value: 'Option4',
        label: 'Option4',
      },
      {
        value: 'Option5',
        label: 'Option5',
      },
    ]
  },
  color: {
    intro: "选择颜色",
    tips: "",
    type: "picker",
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
  color: rgba(255, 255, 255, .7);
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