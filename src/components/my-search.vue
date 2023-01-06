<template>
  <div v-if="show" class="search-box mb-6">
    <div
        class="flex-center shadow-md mb-2"
        :style="{
              height:height+'px',
              borderRadius:radius+'px',
              backgroundColor:`rgba(255,255,255,${opacity/100})`,
            }"
    >
      <div
          class="search-btn left-2"
          @click.stop="searchVisible = !searchVisible"
      >
        <img class="search-btn-eng" :src="searchEngines[currentEngIndex]?.icon" alt="">
      </div>
      <input
          class="input-box"
          placeholder="搜索"
          v-model="inputValue"
          @keydown.enter="searchData"
      />
      <div class="search-btn right-2" @click="searchData">
        <el-icon class="primary-color" style="font-size: 18px">
          <Search/>
        </el-icon>
      </div>
    </div>
    <div
        v-show="searchVisible"
        class="p-2 flex justify-start items-center flex-wrap fadeInDown absolute search-box z-20 rounded-lg bg-white grid grid-cols-4 md:grid-cols-6"
    >
      <div
          class="menu-item"
          v-for="(item,index) in searchEngines"
          :key="index"
          @click="selectCurrent(index)"
      >
        <div class="flex-center flex-col">
          <div class="p-2 bg-white rounded-md flex-center mb-1">
            <img class="menu-img" :src="item.icon" alt="">
          </div>
          <div>
            {{ item.name }}
          </div>
        </div>
      </div>
      <div
          class="menu-item"
      >
        <div class="flex-center flex-col">
          <div class="p-2 bg-white rounded-md flex-center mb-1">
            <el-icon class="menu-img #1890ff">
              <Setting/>
            </el-icon>
          </div>
          <div>
            设置
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//选中的searchEngines
import {reactive, ref, toRefs, watch} from "vue";
import store from "store";
import {IMG_URL} from "../utils/index.js";

const props = defineProps({
  searchSetting: Object
})

const {
  show,
  height,
  radius,
  opacity,
  blank,
} = toRefs(props.searchSetting)

//搜索引擎弹窗
const searchVisible = ref(false)
const closeSearch = () => {
  searchVisible.value = false
}

//选择搜索引擎
const searchEngines = reactive([
  {
    name: "百度",
    target: "https://www.baidu.com/s?&tn=68018901_2_oem_dgie=utf-8&wd=",
    icon: `${IMG_URL}/baidu.svg`
  },
  {
    name: "谷歌",
    target: "https://www.google.com/search?q=",
    icon: `${IMG_URL}/google.svg`
  },
  {
    name: "必应",
    target: "https://cn.bing.com/search?q=",
    icon: `${IMG_URL}/bing.svg`
  },
  {
    name: "360",
    target: "https://www.so.com/s?q=",
    icon: `${IMG_URL}/360.svg`
  },
  {
    name: "搜狗",
    target: "https://www.sogou.com/web?query=",
    icon: `${IMG_URL}/sougou.svg`
  },
  {
    name: "F搜",
    target: "https://fsoufsou.com/search?q=",
    icon: `${IMG_URL}/fsou.svg`
  },
  {
    name: "DuckDuckGo",
    target: "https://duckduckgo.com/?q=",
    icon: `${IMG_URL}/duckduckgo.svg`
  },
  {
    name: "Yahoo",
    target: "https://hk.search.yahoo.com/search?p=",
    icon: `${IMG_URL}/yahoo.svg`
  },
  {
    name: "CSDN",
    target: "https://so.csdn.net/so/search?q=",
    icon: `${IMG_URL}/csdn.ico`
  },
  {
    name: "GitHub",
    target: "https://github.com/search?q=",
    icon: `${IMG_URL}/github.svg`
  },
  {
    name: "StackOverflow",
    target: "https://stackoverflow.com/nocaptcha?s=",
    icon: `${IMG_URL}/stackoverflow.svg`
  },
  {
    name: "开发者搜索",
    target: "https://kaifa.baidu.com/searchPage?wd=",
    icon: `${IMG_URL}/kaifabaidu.svg`
  },
  {
    name: "MDN",
    target: "https://developer.mozilla.org/zh-CN/search?q=",
    icon: `${IMG_URL}/mdn.svg`
  },
  {
    name: "知乎",
    target: "https://www.zhihu.com/search?type=content&q=",
    icon: `${IMG_URL}/zhihu.svg`
  },
])
const currentEngIndex = ref(store.get('currentEngIndex') ? store.get('currentEngIndex') : 0)

const selectCurrent = (index) => {
  currentEngIndex.value = index
  closeSearch()
}

//搜索
const inputValue = ref("")
const searchData = () => {
  let value = ""
  value = inputValue.value.replaceAll('&', '%26')
  value = inputValue.value.replaceAll('#', '%23')
  let res = searchEngines[currentEngIndex.value]?.target + value
  if (blank.value) {
    window.open(res)
  } else {
    window.location.href = res
  }
}

//关闭选择搜索引擎的弹窗
watch(searchVisible, (newValue, oldValue) => {
  if (newValue) {
    document.body.addEventListener('click', closeSearch)
  } else {
    document.body.removeEventListener('click', closeSearch)
  }
})

//
watch(currentEngIndex, (newData) => {
  store.set("currentEngIndex", newData)
})
</script>

<style scoped>
.search-box {
  max-width: 530px;
  width: 90%;
  overflow: hidden;
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
  min-width: 40px;
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
  width: 22px;
  height: auto;
}

.menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
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
  width: 20px;
  height: auto;
  font-size: 20px;
}

.focus-input {
  color: black;
  background-color: rgba(255, 255, 255, .9);
}
</style>