<template>
  <draggable
      class="wrapper"
      :list="list"
      item-key="index"
  >
    <template #item="{element, index}">
      <p>{{element.name}}</p>
    </template>
  </draggable>
</template>
<script setup>
import draggable from "vuedraggable";

defineProps({
  list: Array
})
</script>
<style scoped>
p {
  margin: 5px;
  padding: 10px;
  height: 20px;
  background: lightcoral;
}
</style>