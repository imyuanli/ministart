<template>
  <div v-show="!isFocus" class="absolute left-2 z-50 top-1/2 -translate-y-1/2 sidebar-box">
    <div class="sidebar py-3 px-1 relative">
      <div class="icon-box" :class="iconBoxCss">
        <el-icon :style="{fontSize}">
          <Avatar/>
        </el-icon>
      </div>
      <el-divider style="margin: 12px 0"/>
      <draggable
          :list="workAreaList"
          item-key="index"
          animation="500"
          class="sidebar-content flex-grow"
          delay="100"
      >
        <template #item="{element,index}">
          <div
              class="icon-box mb-2"
              :class="[workAreaId === element.id && 'bg-white-26',iconBoxCss]"
              @click="workAreaId = element.id"
              :key="element.id"
              @contextmenu.prevent="rightWorkClick($event,element.id)"
          >
            <el-tooltip
                class="box-item"
                effect="dark"
                :content="element.name"
                placement="left"
                :key="index"
                :disabled="element.name?false:true"
            >
              <el-icon :style="{fontSize}">
                <component :is="element.icon"></component>
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </draggable>
      <el-divider style="margin: 12px 0"/>
      <el-popover
          placement="left"
          :width="250"
          popper-class="my-popper"
          :show-arrow="false"
          :visible="popoverVisible"
      >
        <template #reference>
          <div class="icon-box" :class="iconBoxCss" @click.stop="openPopover">
            <el-icon style="font-size:22px">
              <CirclePlus/>
            </el-icon>
          </div>
        </template>
        <div class="p-4" @click.stop>
          <el-input
              maxlength='6'
              clearable
              v-model="newWorkAreaData.name"
              show-word-limit
          />
          <div class="grid grid-cols-5 gap-3 my-3">
            <div
                v-for="item in ICON_BOX"
                class="cursor-pointer p-1 flex-center rounded-md duration-200"
                :class="[newWorkAreaData.icon === item && 'bg-white']"
                @click="newWorkAreaData.icon = item"
            >
              <el-icon
                  size="22px"
              >
                <component :is="item"></component>
              </el-icon>
            </div>
          </div>
          <el-button
              v-if="!currentWorkAreaId"
              type="primary"
              class="w-full"
              @click="handleAddWorkArea"
          >
            ???????????????
          </el-button>
          <el-button
              v-if="currentWorkAreaId"
              type="primary"
              class="w-full"
              @click="handleUpdateWorkArea"
          >
            ???????????????
          </el-button>
        </div>
      </el-popover>
    </div>
<!--    <div class="flex-center cursor-pointer mt-1">-->
<!--      <div class="more-btn flex-center rounded-md">-->
<!--        <el-icon style="color: rgba(255,255,255,.8)">-->
<!--          <More/>-->
<!--        </el-icon>-->
<!--      </div>-->
<!--    </div>-->
  </div>
  <RightPopover
      v-model:rightVisible="workVisible"
      :left="wLeft"
      :top="wTop"
      @handleDelete="handleDelWorkArea"
      @handleEdit="handleWorkEdit"
      v-model:currentId="currentWorkAreaId"
  />
  <div
      v-if="show"
      class="tool-box absolute-center  top-64 md:top-96"
      :style="{maxWidth:`${maxWidth}px`}"
  >
    <draggable
        :list="getWorkArea()?.children"
        item-key="index"
        animation="500"
        v-show="!isFocus"
        class="tool-grid duration-200"
        :style="{
                      gridTemplateColumns:`repeat(auto-fill,${size+gapY}px)`,
                      gridTemplateRows:`repeat(auto-fill,${size+gapX+30}px)`,
                 }"
    >
      <template #item="{element}">
        <div
            class="tool-item"
            :style="{padding: `0 ${gapY/2}px ${gapX}px`,
                     width:`${size + gapY}px`,
                     height:`${size+ gapX}px`
                     }"
            :key="element.id"
            @contextmenu.prevent="rightClick($event,element.id)"
        >
          <div
              class="bg-white p-1 rounded-md cursor-pointer w-full h-full flex-center"
              :style="{opacity:opacity/100,borderRadius:`${radius}px`}"
          >
            <img
                class="w-full h-full object-cover"
                v-if="element.type==='icon'"
                :src="element.src"
                :alt="element.name"
                :style="{borderRadius:`${radius}px`}"
            >
            <div class="text-black bg-primary-color rounded-full flex-center text-white text-xl font-bold"
                 v-if="element.type==='text'"
            >
              <span class="px-2.5 py-1.5">{{ element.src }}</span>
            </div>
          </div>
          <div class="text-center text-md font-semibold mt-1 overflow-ellipsis truncate w-full">{{ element.name }}</div>
        </div>
      </template>
      <template #footer>
        <div class="tool-item"
             :style="{
                           padding: `0 ${gapY/2}px ${gapX}px`,
                           gridColumn: `span 1`,
                           gridRow: `span 1`,
                           width:`${size + gapY}px`,
                           height:`${size+ gapX}px`
                        }"
        >
          <div class="flex-center flex-col w-full h-full"
               @click="openDialog"
          >
            <div
                class="rounded-md cursor-pointer w-full h-full flex-center bg-white p-1"
                :style="{opacity:opacity/100,borderRadius:`${radius}px`}"
            >
              <div class="bg-blue-400 flex-center rounded-full">
                <el-icon :style="{fontSize: `${size-8}px`}">
                  <CirclePlus/>
                </el-icon>
              </div>
            </div>
          </div>
        </div>
      </template>
    </draggable>
  </div>
  <MyDialog
      v-model:dialogVisible="editDialogVisible"
      @closeDialog="closeDialog"
  >
    <template #title>
      ??????????????????
    </template>
    <template #content>
      <div v-loading="loading" class="flex justify-center items-start flex-col text-base prefix-text-color">
        <div class="py-3 shortcut-box">
          <div>??????</div>
          <MyInput v-model.trim="shortcutData.name"/>
        </div>
        <div class="py-3 shortcut-box">
          <div>??????</div>
          <MyInput v-model.trim="shortcutData.url"/>
        </div>
        <div class="py-3 shortcut-box">
          <div class="flex-none">??????</div>
          <div class="flex-center ml-3">
            <div class="shortcut-icon-box">
              <div class="font-bold" v-if="shortcutData.type==='text'">{{ shortcutData.src }}</div>
              <img v-if="shortcutData.type==='icon'" class="shortcut-icon" :src="shortcutData.src" alt="">
            </div>
            <div class="ml-3 flex flex-wrap justify-start">
              <div class="m-1">
                <el-button round @click="getIcon">??????</el-button>
              </div>
              <div class="m-1">
                <el-button round @click="getText">??????</el-button>
              </div>
              <el-button class="m-1" @click="getDefault" round>??????</el-button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #bottom>
      <el-button @click="closeDialog">??? ???</el-button>
      <el-button v-if="!currentShortcutId" type="primary" @click="handleAddShortcut">??? ???</el-button>
      <el-button v-if="currentShortcutId" type="primary" @click="handleUpdateShortcut">??? ???</el-button>
    </template>
  </MyDialog>
  <RightPopover
      v-model:rightVisible="visible"
      :left="left"
      :top="top"
      v-model:currentId="currentShortcutId"
      @handleDelete="handleDelShortcut"
      @handleEdit="handleEditShortcut"
  />
</template>
<script setup>
import {reactive, ref, toRefs, unref, watch} from "vue";
import MyInput from '../components/my-input.vue'
import MyDialog from '../components/my-dialog.vue'
import RightPopover from '../components/right-popover.vue'
import {ElMessage} from "element-plus";
import store from 'store'
import {get_url_icon} from "../service/service.js";
import {IMG_URL, ICON_BOX} from "../utils/index.js";
import draggable from 'vuedraggable'
import {v4 as uid} from 'uuid'

//??????
const props = defineProps({
  toolSetting: Object,
  isFocus: Boolean
})
//?????????css
const iconBoxCss = 'cursor-pointer flex-center flex-col p-2 rounded-md'
const fontSize = '20px'

//???????????????????????????
const {
  show,
  size,
  radius,
  opacity,
  gapX,
  gapY,
  maxWidth
} = toRefs(props.toolSetting)

//?????????
// region
//??????????????????id
const workAreaId = ref(
    store.get('workAreaId') ?
        store.get('workAreaId')
        :
        'zhuye'
)
//???????????????
const workAreaList = reactive(
    store.get('workAreaList') ?
        store.get('workAreaList')
        :
        [
          {
            id: 'zhuye',
            name: "??????",
            icon: 'HomeFilled',
            children: []
          }
        ]
)
//??????????????????
const newWorkAreaData = reactive({
  id: '',
  name: '??????',
  icon: 'HomeFilled',
  children: []
})
//????????????????????????????????????
const getWorkArea = (id = workAreaId.value) => workAreaList.find(item => item.id === id)
//????????????
const popoverVisible = ref(false)
//??????
const openPopover = () => popoverVisible.value = true
//??????
const closePopover = () => {
  popoverVisible.value = false
  newWorkAreaData.name = "??????"
  newWorkAreaData.icon = "HomeFilled"
  newWorkAreaData.children = []
  currentWorkAreaId.value = null
}
//????????????????????????
//???????????????id
const currentWorkAreaId = ref(null)
//???
const handleAddWorkArea = () => {
  const id = uid()
  newWorkAreaData.id = id
  workAreaList.push({...newWorkAreaData})
  workAreaId.value = id
  closePopover()
}
//?????????????????????
const workVisible = ref(false)
const wLeft = ref(0)
const wTop = ref(0)
const rightWorkClick = (e, id) => {
  wLeft.value = e.pageX
  wTop.value = e.pageY
  workVisible.value = true
  currentWorkAreaId.value = id
}
//?????????????????????
const handleWorkEdit = () => {
  const res = getWorkArea(currentWorkAreaId.value)
  newWorkAreaData.name = res.name
  newWorkAreaData.icon = res.icon
  openPopover()
}

//???
const handleDelWorkArea = () => {
  const index = workAreaList.findIndex(item => item.id === currentWorkAreaId.value)
  if (currentWorkAreaId.value === 'zhuye') {
    ElMessage({
      message: '????????????????????????',
      type: 'warning',
    })
    return
  }
  workAreaList.splice(index, 1)
  //???????????????????????????????????????
  if (currentWorkAreaId.value === workAreaId.value) {
    workAreaId.value = 'zhuye'
  }
}
//??????
const handleUpdateWorkArea = () => {
  const res = getWorkArea(currentWorkAreaId.value)
  res.name = newWorkAreaData.name
  res.icon = newWorkAreaData.icon
  closePopover()
}
// endregion

//????????????
//region

//??????????????????????????????
const shortcutData = reactive({
  id: "",
  name: "",
  url: "",
  src: `${IMG_URL}default.png`,
  type: "icon",
})

//??????shortcutData
const reDefaultShortcut = () => {
  shortcutData.id = ""
  shortcutData.name = ""
  shortcutData.url = ""
  shortcutData.src = `${IMG_URL}default.png`
  shortcutData.type = "icon"
}

//??????????????????
const editDialogVisible = ref(false)

//???????????????id
const currentShortcutId = ref(null)
watch(currentShortcutId, d => {
  console.log('123', d)
})
//??????
const openDialog = () => editDialogVisible.value = true
//??????
const closeDialog = () => {
  editDialogVisible.value = false
  reDefaultShortcut()
  currentShortcutId.value = null
}

//??????????????????
const loading = ref(false)

//??????
const nameNotNull = () => {
  if (shortcutData?.name) return true
  else {
    ElMessage({
      message: '??????????????????',
      type: 'warning',
    })
    return false
  }
}

//?????????
const urlNotNull = () => {
  if (shortcutData?.url) return true
  else {
    ElMessage({
      message: '??????????????????',
      type: 'warning',
    })
    return false
  }
}
//????????????
const getIcon = () => {
  if (!urlNotNull()) return;
  loading.value = true
  get_url_icon({url: shortcutData?.url})
      .then((res) => {
        if (res) {
          shortcutData.src = res
          shortcutData.type = 'icon'
          shortcutData.value = false
          loading.value = false
        }
      })
      .catch(() => {
        loading.value = false
      })
}
//???????????????
const getText = () => {
  if (!nameNotNull()) return;
  shortcutData.src = shortcutData?.name[0]
  shortcutData.type = 'text'
}
//??????
const getDefault = () => {
  shortcutData.src = `${IMG_URL}default.png`
  shortcutData.type = 'icon'
}

//????????????????????????
//??????
const handleAddShortcut = () => {
  if (!nameNotNull()) return;
  if (!urlNotNull()) return;
  shortcutData.id = uid()
  const children = getWorkArea()?.children
  children.push({...shortcutData})
  closeDialog()
}

//????????????
const visible = ref(false)
const top = ref(0)
const left = ref(0)
const rightClick = (e, id) => {
  left.value = e.pageX;
  top.value = e.pageY;
  visible.value = true;
  currentShortcutId.value = id
}

//????????????
const handleEditShortcut = () => {
  const children = getWorkArea()?.children
  const res = children.find(item => item.id === currentShortcutId.value)
  shortcutData.id = res.id
  shortcutData.name = res.name
  shortcutData.url = res.url
  shortcutData.src = res.src
  shortcutData.type = res.type
  openDialog()
}

//???????????????index
const getShortcutIndex = (children) => children.findIndex(item => item.id === currentShortcutId.value)

//??????
const handleUpdateShortcut = () => {
  if (!nameNotNull()) return;
  if (!urlNotNull()) return;
  const children = getWorkArea()?.children
  const index = getShortcutIndex(children)
  children[index] = {...shortcutData}
  closeDialog()
}
//??????
const handleDelShortcut = () => {
  const children = getWorkArea()?.children
  const index = getShortcutIndex(children)
  children.splice(index, 1)
}
// endregion

//???????????? ?????????
watch(workAreaId, (newData) => {
  if (newData) {
    store.set('workAreaId', newData)
  }
})

watch(workAreaList, (newTool) => {
  if (newTool) {
    store.set("workAreaList", newTool)
  }
})

watch(popoverVisible, (newValue) => {
  if (newValue) {
    document.body.addEventListener('click', closePopover)
  } else {
    document.body.removeEventListener('click', closePopover)
  }
})
</script>

<style>
.tool-box {
  max-height: 55%;
  width: 85%;
  color: #fff;
  transition: .25s;
  overflow-y: auto;
}

/*????????????768?????????*/
@media (max-width: 640px) {
  .tool-box {
    max-height: 45%;
    width: 100%;
  }
}

.tool-box::-webkit-scrollbar {
  display: none;
}

.tool-grid {
  position: relative;
  display: grid;
  user-select: none;
  grid-auto-flow: dense;
  box-sizing: border-box;
  justify-content: space-between;
  width: 100%;
}

.tool-item {
  list-style-type: none;
  position: relative;
  height: 100%;
  box-sizing: border-box;
}

.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  min-width: 120px;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgb(0 0 0 / 25%);
  transition: .25s cubic-bezier(0.65, 0.05, 0.1, 1);
  overflow: hidden;

}

.menu {
  padding: 10px 15px;
  border-radius: 5px;
  color: black;
  font-size: 12px;
  transition: .25s;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.edit-btn:hover {
  background-color: rgba(0, 0, 0, .1);
}

.menu-icon {
  margin-right: 5px;
  font-size: 14px;
}

.delete-btn:hover {
  background: rgba(255, 75, 104, .1);
}

.delete-color {
  color: #FF4B68;
}


.shortcut-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.shortcut-icon-box {
  min-width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid #cccccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.shortcut-icon {
  width: 35px;
  height: 35px;
}


/*?????????*/
.sidebar-box {
  height: 70%;
  max-height: 480px;
  width: 48px;
}

.sidebar {
  height: 100%;
  background: rgba(0, 0, 0, .4);
  color: white;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  border-color: rgba(255, 255, 255, .1);
  border-radius: 10px;
}

.sidebar-content {
  overflow: auto;
}

.sidebar-content::-webkit-scrollbar {
  display: none;
}

.more-btn {
  width: 50%;
}

.more-btn:hover {
  background-color: rgba(0, 0, 0, .4);
}

.icon-box:hover {
  background-color: #ffffff26;
  transition: 300ms;
}

.bg-white-26 {
  background-color: #ffffff26;
}

.my-popper {
  background-color: rgba(255, 255, 255, .8) !important;
  border-radius: 15px;
  padding: 0 !important;
}
</style>