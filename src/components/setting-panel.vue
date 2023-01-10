<template>
  <div class="mb-3">
    <div class="ml-2 font-bold text-black mb-1">
      <slot name="panel-title"></slot>
    </div>
    <!--    主要开关，当主开关关闭其他数据隐藏-->
    <div v-if="settingObj.show!==undefined">
      <div v-if="!settingObj.show">
        <PanelContent :info="setInfo['show']" :settingObj="settingObj" :item="'show'"/>
      </div>
      <!--    具体设置-->
      <div v-if="settingObj.show">
        <div v-for="(item,index) in Object.keys(settingObj)" :key="index">
          <PanelContent :info="setInfo[item]" :settingObj="settingObj" :item="item"/>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-for="(item,index) in Object.keys(settingObj)" :key="index">
        <PanelContent :info="setInfo[item]" :settingObj="settingObj" :item="item"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import PanelContent from './panel-content.vue'
import {SET_INFO} from '../utils/index.js'

const props = defineProps({
  settingObj: Object,
  settingName: String
})
const setInfo = SET_INFO[props.settingName]
</script>

<style scoped>

</style>