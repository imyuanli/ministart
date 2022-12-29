<template>
  <div class="footer">
    <div class="mb-1">
      Copyright © {{ new Date().getFullYear() }} 鸢离
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.footer {
  display: inline-block;
  backdrop-filter: blur(10px);
  animation: delayedFadeIn 1s;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  text-align: center;
  text-shadow: 0 0 20px rgb(0 0 0 / 40%);
  white-space: nowrap;
  padding: 3px 10px;
}
</style>