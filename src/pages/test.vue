<template>
  <div class="grid grid-cols-6 w-1/2">
    <div
        v-for="(item,index) in list"
        draggable="true"
        @dragstart="handleDragStart(index)"
        @dragenter="handleDragEnter(index)"
        @dragend="handleDragEnd"
        @dragover.prevent
        class="box"
        :class="[drawer && index==enterIndex  && 'duration-200 scale-150']"
    >
      <div v-if="item.children" @click="handleOpenDrawer">
        <div class="grid grid-cols-3">
          <div v-for="child in item.children" class="flex-center flex-col scale-50">
            <img :src="child.icon" alt="">
            <div>{{ child.name }}</div>
          </div>
        </div>
        <div>
          文件夹
        </div>
      </div>
      <div v-else class="flex-center flex-col">
        <img :src="item.icon" alt="">
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
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
          {name: 123, icon: 'https://qiniu.imyuanli.cn/mini/default.png'},
          {name: 123, icon: 'https://qiniu.imyuanli.cn/mini/default.png'},
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
const handleDragStart = (index) => {
  console.log(index)
  startIndex.value = index
}

//当前拖拽的状态  交换/移入文件夹
//如果出现 drawer效果就说明可以放入,否则是换位
const drawer = ref(false)

//定时器延迟500ms
let timeOutEvent = null

const handleDragEnter = (index) => {
  enterIndex.value = index
  //初始
  let sIndex = startIndex.value
  //保证初始元素和进入的不同
  if (sIndex !== index) {
    //如果有清空
    if (timeOutEvent) {
      clearTimeout(timeOutEvent); //清除定时器
    }
    //这里设置定时器，定义长按500毫秒触发长按事件
    timeOutEvent = setTimeout(() => {
      //如果初始是文件 不能放入
      if (!list[sIndex].children) {
        drawer.value = true
      }
    }, 250);
  }
}

//拖拽结束
const handleDragEnd = () => {
  //初始
  let sIndex = startIndex.value
  //进入
  let eIndex = enterIndex.value
  //初始和进入不同触发
  if (sIndex !== eIndex) {
    //暂存数据
    let tmpEnter = list[eIndex]
    let tmpStart = list[sIndex]
    //放入
    if (drawer.value) {
      let children = tmpEnter?.children
      //如果进入的有children
      if (children) {
        children.push(tmpStart)
      }
      //创建新的文件夹
      else {
        list[eIndex] = {
          id: "1231231dsad",
          name: "文件夹",
          children: [
            tmpEnter,
            tmpStart
          ]
        }
      }
      //删除 sIndex
      list.splice(sIndex, 1)
    }
    //换位
    else {
      list[eIndex] = tmpStart;
      list[sIndex] = tmpEnter;
    }
  }
  startIndex.value = null
  enterIndex.value = null
  clearTimeout(timeOutEvent); //清除定时器
  drawer.value = false
}

//监听进入的index 及时清空
watch(enterIndex, (newData, oldData) => {
  if (oldData !== newData) {
    drawer.value = false
    clearTimeout(timeOutEvent); //清除定时器
  }
})

watch(list, (newData, oldData) => {
  console.log(newData)
})


//打开折叠的drawer
const handleOpenDrawer = () => {
  console.log(12312)
}
</script>
<style scoped>
.box {
  margin: 20px;
  background-color: #42b983;
  color: #ffffff;
}

</style>
