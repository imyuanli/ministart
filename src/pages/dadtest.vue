<template>
  <draggable
      class="wrapper"
      :list="list"
      item-key="index"
      ghost-class="ghost"
      chosen-class="chosenClass"
      animation="300"
      @start="handleDragStart"
      @end=""
      :move="handleMoving"
  >
    <template #item="{element, index}">
      <div class="item">
        <Nested :list="element.children"/>
        <div>{{ element.name }}</div>
      </div>
    </template>
  </draggable>
</template>

<script setup>
import draggable from 'vuedraggable';
import {reactive, ref} from "vue";
import Nested from "../components/nested.vue";

const list = reactive(
    [
      {
        id: '13212312',
        name: 3,
        icon: 'https://qiniu.imyuanli.cn/mini/default.png'
      },
      {
        id: '12341452',
        name: '文件夹',
        children: [
          {name: 123, icon: 'https://qiniu.imyuanli.cn/mini/default.png'},
          {name: 123, icon: 'https://qiniu.imyuanli.cn/mini/default.png'},
          {name: 123, icon: 'https://qiniu.imyuanli.cn/mini/default.png'},
        ]
      },
      {
        id: '4124',
        name: 1,
        icon: 'https://qiniu.imyuanli.cn/mini/default.png'
      },
      {
        id: '1321241525312',
        name: 2,
        icon: 'https://qiniu.imyuanli.cn/mini/default.png'
      },
    ],
)

//选中的index
const startIndex = ref(null)
//进入的index
const enterIndex = ref(null)

//开始拖拽
const handleDragStart = (e) => {
  startIndex.value = e.oldIndex
}
const handleMoving = (e,originalEvent) => {
  console.log(e)
  // return false
}

</script>
<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.item {
  margin: 20px;
  width: 300px;
  background-color: #42b983;
  color: #ffffff;
}

.ghost {
  border: solid 1px rgb(19, 41, 239) !important;
}

.chosenClass {
  background-color: #eee;
  opacity: 1;
  border: solid 1px red;
}

</style>
