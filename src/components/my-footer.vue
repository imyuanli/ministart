<template>
  <div class="footer">
    <div>
      <span v-if="!simple">Copyright</span> © {{ new Date().getFullYear() }} 鸢离
      <a v-if="!simple" href="https://beian.miit.gov.cn/">冀ICP备2020030880号</a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  simple: Boolean
})
</script>

<style scoped>
.footer {
  display: inline-block;
  backdrop-filter: blur(8px);
  animation: delayedFadeIn 1s;
  position: fixed;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  text-align: center;
  text-shadow: 0 0 20px rgb(0 0 0 / 40%);
  white-space: nowrap;
  padding: 2px 4px;
  color: #ffffff;
}
</style>