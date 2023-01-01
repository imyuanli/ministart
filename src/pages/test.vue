<template>
  <div>
    <div class="app-grid"
         :style="{
              gridTemplateColumns:`repeat(auto-fill,${size+gapY}px)`,
              gridTemplateRows:`repeat(auto-fill,${size+gapX}px)`,
         }"
    >
      <div v-for="(item,index) in arr"
           :class="['app-item']"
           :style="{
               padding: `0 ${gapY/2}px ${gapX}px`,
               borderRadius:`${radius}px`,
               gridColumn: `span ${item.size[1]}`,
               gridRow: `span ${item.size[0]}`,
               width:`${size*item.size[1] + gapY*item.size[1]}px`,
               height:`${size*item.size[0]+ gapY*item.size[0]}px`
            }"
      >
        <div class="box">
          {{ item.name }}
        </div>
      </div>
    </div>
    <el-button @click="size++">+</el-button>
    <el-button @click="size--">-</el-button>
  </div>
</template>

<script setup>

import {ref, watch} from "vue";

const arr = [
  {
    name: 1,
    size: [2,2]
  },

]
const size = ref(30)
const gapY = ref(5)
const gapX = ref(5)
const opacity = ref(5)
const radius = ref(15)

watch(size, (newDate) => {
  console.log(newDate)
})
</script>

<style scoped>
.app-grid {
  position: relative;
  display: grid;
  padding-top: 2vh;
  user-select: none;
  grid-auto-flow: dense;
  box-sizing: border-box;
  justify-content: center;
  padding-bottom: 50px;
  grid-template-columns: repeat(auto-fill, 60px);
  grid-template-rows: repeat(auto-fill, 60px);
}

.app-item {
  list-style-type: none;
  position: relative;
  grid-column: span 1;
  grid-row: span 1;
  height: 100%;
  user-select: none;
  -webkit-user-select: none;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.icon-size-2x2 {
  grid-column: span 2;
  grid-row: span 2;
  width: calc(var(--icon-size) * 2 + var(--icon-gap-y) * 2);
  height: calc(var(--icon-size) * 2 + var(--icon-gap-x) * 2);
}
</style>