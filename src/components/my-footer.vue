<template>
  <div :class="['footer',textColor]">
    <div class="mb-1">
      Copyright © 2022 鸢离
    </div>
    <div>
      <a class="text" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41052202001272">豫公安网备41052202001272</a>
      <el-divider direction="vertical"/>
      <a class="text" href="https://beian.miit.gov.cn/">冀ICP备2020030880号</a></div>
  </div>
</template>

<script setup>
const props = defineProps({
  textColor: String
})
</script>

<style scoped>
.footer {
  display: inline-block;
  border-radius: 2px;
  backdrop-filter: blur(10px);
  animation: delayedFadeIn 1s;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  font-size: 12px;
  text-align: center;
  text-shadow: 0 0 20px rgb(0 0 0 / 80%);
  white-space: nowrap;
  padding: 3px 10px;
}
</style>