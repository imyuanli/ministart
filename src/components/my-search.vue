<template>
  <div :class="['search-box flex-center absolute-center top-40',isFocus?'focus-input':'blur-input']">
    <!--    更换搜索引擎-->
    <el-popover
        v-if="isFocus"
        placement="bottom"
        trigger="click"
    >
      <div class="menu-item" v-for="(item,index) in searchEngines" :key="index">
        <img class="menu-img" :src="item.icon" alt="">
        <span>{{ item.name }}</span>
      </div>
      <!--      新增搜索-->
      <div class="menu-item">
        <el-icon style="vertical-align: middle;font-size: 16px">
          <Setting/>
        </el-icon>
        <span class="ml-1">设置搜索引擎</span>
      </div>
      <template #reference>
        <div v-show="isFocus" class="search-btn left-2">
          <img class="search-btn-eng" :src="searchEngines[currentIndex].icon" alt="">
        </div>
      </template>
    </el-popover>
    <input
        class="my-input"
        @click="handleClickOpen"
        :placeholder="isFocus?'':'搜索'"
    />
    <div @click="handleSearch" v-show="isFocus" class="search-btn right-2">
      <el-icon style="vertical-align: middle;font-size: 18px;color:#70C000 ">
        <Search/>
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  isFocus: Boolean,
  handleClickOpen: Function,
})
//popver
const popoverVisible = ref(false)
//选中的searchEngines
const currentIndex = 0
const searchEngines = [
  {
    name: "百度",
    target: "https://www.baidu.com/s?wd=",
    icon: 'https://www.baidu.com/favicon.ico'
  },
  {
    name: "必应",
    target: "https://cn.bing.com/search?q=",
    icon: 'https://www.jianfast.com/static/home/images/searchChoice/bing.svg'
  },
  {
    name: "谷歌",
    target: "https://www.google.com/search?q=",
    icon: 'https://www.jianfast.com/static/home/images/searchChoice/google.svg'
  },
  {
    name: "360",
    target: "https://www.so.com/s?q=",
    icon: 'https://s2.ssl.qhimg.com/static/121a1737750aa53d.ico'
  },
  {
    name: "搜狗",
    target: "https://www.sogou.com/web?query=",
    icon: 'https://www.sogou.com/images/logo/new/favicon.ico'
  },
]

//搜索
const handleSearch = () => {
  let value = ""
  value = this.inputValue.replaceAll('&', '%26')
  value = this.inputValue.replaceAll('#', '%23')
  window.location.href = this.selectTarget + value
}
</script>

<style scoped>
.search-box {
  height: 43px;
  max-width: 530px;
  border-radius: 30px;
  overflow: hidden;
  -webkit-backdrop-filter: blur(10px) saturate(1.5);
  backdrop-filter: blur(10px) saturate(1.5);
  box-shadow: rgb(0 0 0 / 20%) 0 0 10px;
  transition: 300ms;
}

.focus-input {
  width: 100%;
  color: black;
  background-color: rgba(255, 255, 255, .9);
}

/*屏幕小于768的时候*/
@media (max-width: 768px) {
  .search-box {
    max-width: 90%;
  }
}


.blur-input {
  width: 270px;
  color: #fff;
  background-color: rgba(255, 255, 255, .25);
}

.blur-input:hover {
  width: 100%;
  background-color: rgba(255, 255, 255, .6);
}

.my-input {
  outline: 0;
  border: none;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  color: #fff;
  background-color: transparent;
  font-size: 14px;
  text-align: center;
}

.search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: .25s;
  text-align: center;
}

.search-btn:hover {
  border-radius: 50px;
  background-color: #fff;
  filter: brightness(1.1);
}

.search-btn-eng {
  width: 18px;
  height: auto;
}

.menu-item {
  display: flex;

  padding: 10px 5px;
  border-radius: 5px;
  color: black;
  font-size: 12px;
  transition: .25s;
  cursor: pointer;
}

.menu-item:hover {
  background-color: rgba(0, 0, 0, .1);
}

.menu-img {
  width: 18px;
  height: auto;
  margin-right: 6px;
}

</style>