<template>
  <div :class="['search-box flex-center']">
    <!--    更换搜索引擎-->
    <el-popover
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
        <div class="search-btn left-2">
          <img class="search-btn-eng" :src="searchEngines[currentIndex].icon" alt="">
        </div>
      </template>
    </el-popover>
    <input
        class="input-box"
        @click="handleClickOpen"
        placeholder="搜索"
    />
    <div @click="handleSearch" class="search-btn right-2">
      <el-icon style="vertical-align: middle;font-size: 18px">
        <Search/>
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
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
  height: 46px;
  max-width: 530px;
  width: 90%;
  border-radius: 30px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
  transition: 300ms;
}

.input-box {
  outline: 0;
  border: none;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: transparent;
  font-size: 14px;
  text-align: center;
}

.search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 45px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: .25s;
  text-align: center;
}

.search-btn:hover {
  background-color: rgba(0, 0, 0, .1);
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