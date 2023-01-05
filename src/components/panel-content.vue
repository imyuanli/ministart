<template>
  <div class="flex justify-between py-3">
    <div class="flex-1 flex justify-center items-start flex-col">
      <div class="text-md text-black">
        {{ info.intro }}
      </div>
      <div class="text-xs text-gray-400">
        {{ info?.tips }}
      </div>
    </div>
    <div class="flex-1 flex justify-end items-center">
      <el-switch
          v-if="info.type==='switch'"
          v-model="settingObj[item]"
      />
      <el-slider
          v-if="info.type==='slider'"
          v-model="settingObj[item]"
          class="w-full"
          :min="info.min"
          :max="info.max"
      />
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