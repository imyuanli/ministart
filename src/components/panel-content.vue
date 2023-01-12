<template>
  <div v-if="info?.type" class="flex justify-between py-3">
    <div class="flex flex-1 justify-center items-start flex-col" style="flex: 1">
      <div class="text-md text-black">
        {{ info?.intro }}
      </div>
      <div class="text-xs text-gray-400">
        {{ info?.tips }}
      </div>
    </div>
    <div class="flex justify-end items-center" :style="{
      flex: info.type==='slider'?1.5:1
    }">
      <el-switch
          v-if="info.type==='switch'"
          v-model="settingObj[item]"
      />
      <div v-if="info.type==='slider'" class="w-full flex-center">
        <el-slider
            v-model="settingObj[item]"
            class="w-full"
            :min="info.min"
            :max="info.max"
        />
        <div class="flex justify-end" style="width:60px">{{ settingObj[item] }}%</div>
      </div>
      <el-select
          v-if="info.type==='select'"
          v-model="settingObj[item]"
      >
        <el-option
            v-for="item in info.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-color-picker
          v-if="info.type==='picker'"
          v-model="settingObj[item]"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  info: Object,
  settingObj: Object,
  item: String,
})
</script>

<style scoped>

</style>