<template>
  <div class="ml-6 w-full">
    <input
        :value="modelValue"
        maxlength="8"
        class="my-input"
        @input="handleChange"
    />
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])
const handleChange = (e) => {
  emit('update:modelValue', e.target.value)
}
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
  width: 100%;
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
  border-bottom: solid 1px #409eff;
}
</style>