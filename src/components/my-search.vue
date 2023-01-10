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
        <img class="search-btn-eng" :src="IMG_URL+getEngItem()?.icon" alt="">
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
        class="p-2 flex justify-start items-center flex-wrap fadeInDown absolute search-box z-20 rounded-lg bg-white grid grid-cols-4 md:grid-cols-6 sm:grid-cols-5"
    >
      <div v-for="check in checkEngList">
        <div v-for="(item,index) in searchEngines">
          <div
              class="menu-item"
              v-if="item?.id ===check"
              :key="index"
              @click="selectCurrent(item?.id)"
          >
            <div class="flex-center flex-col">
              <div class="p-2 bg-white rounded-md flex-center mb-1">
                <img class="menu-img" :src="IMG_URL+item?.icon" alt="">
              </div>
              <div>
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
          class="menu-item"
          @click="enginesDialogVisible = true"
      >
        <div class="flex-center flex-col">
          <div class="p-2 bg-white rounded-md flex-center mb-1">
            <el-icon class="menu-img #1890ff">
              <Setting/>
            </el-icon>
          </div>
          <div>
            搜索引擎偏好
          </div>
        </div>
      </div>
    </div>
    <MyDialog
        v-model:dialogVisible="enginesDialogVisible"
    >
      <template #title>
        搜索引擎偏好设置
      </template>
      <template #content>
        <div class="rounded-md bg-white px-3 py-3">
          <el-checkbox-group class="grid grid-cols-1 sm:grid-cols-2 gap-2" v-model="checkEngList" :min="1" :max="6">
            <div v-for="item in DEFAULT_ENGINES"
                 class="w-full p-3 flex cursor-pointer bg-gray-100 hover:bg-gray-200 duration-200 truncate overflow-ellipsis"
            >
              <el-tooltip
                  class="box-item"
                  effect="light"
                  content="该搜索引擎正在被使用，无法操作"
                  placement="top"
                  :disabled="currentEngId !== item.id"
              >
                <el-checkbox :disabled="currentEngId === item.id" class="w-full" :label="item.id">
                  <div class="flex w-full">
                    <img class="menu-img mr-3" :src="IMG_URL+item.icon" alt="">
                    <div class="w-full">
                      <div class="mb-1 w-full">
                        {{ item.name }}
                      </div>
                      <div class="inline-block truncate overflow-ellipsis w-44" style="font-size:12px">
                        {{ item.target }}
                      </div>
                    </div>
                  </div>
                </el-checkbox>
              </el-tooltip>
            </div>
          </el-checkbox-group>
        </div>
      </template>
    </MyDialog>
  </div>
</template>

<script setup>
import {reactive, ref, toRefs, watch, getCurrentInstance, onMounted} from "vue";
import store from "store";
import MyDialog from '../components/my-dialog.vue'
import {IMG_URL, DEFAULT_ENGINES} from "../utils/index.js";
//全局事件总线
let {proxy} = getCurrentInstance()
onMounted(() => {
  proxy.$mitt.on('enginesDialogVisible', (res) => {
    enginesDialogVisible.value = res
  })
})

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

//所有的搜索引擎
//todo 可以用户自定义搜索引擎?暂时这么写吧
const searchEngines = reactive(
    store.get('searchEngines') ?
        store.get('searchEngines')
        :
        DEFAULT_ENGINES
)

//选择显示多少搜索引擎
const enginesDialogVisible = ref(false)
//选中的searchEngines
const checkEngList = ref(
    store.get('checkEngList') ?
        store.get('checkEngList')
        :
        ['baidu', 'google', 'bing']
)
//存到本地
watch(checkEngList, (newData) => {
  store.set('checkEngList', newData)
})

//搜索引擎的下滑选择
const searchVisible = ref(false)
const closeSearch = () => {
  searchVisible.value = false
}
const currentEngId = ref(store.get('currentEngId') ? store.get('currentEngId') : 'baidu')

//通过id获取对应的搜索item
const getEngItem = () => searchEngines.find(item => item.id === currentEngId.value)

//选择搜索引擎
const selectCurrent = (id) => {
  currentEngId.value = id
  closeSearch()
}
//选择的搜索引擎
watch(currentEngId, newData => store.set("currentEngId", newData))
//关闭选择搜索引擎的弹窗
watch(searchVisible, (newValue) => {
  if (newValue) {
    document.body.addEventListener('click', closeSearch)
  } else {
    document.body.removeEventListener('click', closeSearch)
  }
})

//搜索
const inputValue = ref("")
const searchData = () => {
  let value = ""
  value = inputValue.value.replaceAll('&', '%26')
  value = inputValue.value.replaceAll('#', '%23')
  let res = getEngItem()?.target + value
  if (blank.value) {
    window.open(res)
  } else {
    window.location.href = res
  }
}
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
  padding: 6px 0;
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
  object-fit: contain;
}

.focus-input {
  color: black;
  background-color: rgba(255, 255, 255, .9);
}
</style>