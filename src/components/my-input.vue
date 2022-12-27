<template>
<!--  <input-->
<!--      v-model="inputValue"-->
<!--      maxlength="8"-->
<!--      class="my-input"-->
<!--  />-->
</template>

<script setup>

</script>

<style scoped>
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

.my-input:focus {
  border-bottom: solid 1px #70C000;
}
</style>