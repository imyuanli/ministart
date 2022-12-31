<template>
  <div class="mb-3">
    <div class="ml-2 font-bold text-black mb-1">
      <slot name="panel-title">panel-title</slot>
    </div>
<!--    主要开关，当主开关关闭其他数据隐藏-->
    <div v-if="!settingObj[mainSwitch]" class="bg-white rounded-md px-6 py-3">
      <div class="flex justify-between py-3">
        <div>{{ mainSwitch }}{{ settingObj[mainSwitch] }}</div>
        <div class="flex-1 flex justify-center items-start flex-col">
          <div class="text-md text-black">
            {{ setInfo[mainSwitch].intro }}
          </div>
          <div class="text-xs text-gray-400">
            {{ setInfo[mainSwitch]?.tips }}
          </div>
        </div>
        <div class="flex-1 flex justify-end items-center">
          <el-switch v-model="settingObj[mainSwitch]"/>
        </div>
      </div>
    </div>
    <div v-if="settingObj[mainSwitch]" class="bg-white rounded-md px-6 py-3">
      <div v-for="(item,index) in Object.keys(settingObj)" :key="index">
        <div class="flex justify-between py-3">
          <div class="flex-1 flex justify-center items-start flex-col">
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
                v-model="settingObj[item]"
            />
            <el-slider
                v-if="setInfo[item].type==='slider'"
                v-model="settingObj[item]"
                class="w-full"
                :min="setInfo[item].min"
                :max="setInfo[item].max"
            />
            <el-select
                v-if="setInfo[item].type==='select'"
                v-model="settingObj[item]"
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
                v-model="settingObj[item]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {setInfo} from '../utils/index.js'

defineProps({
  settingObj: Object,
  mainSwitch: Boolean
})
</script>

<style scoped>

</style>