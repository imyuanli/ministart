<template>
  <div v-show="!isFocus" class="absolute left-2 z-50 top-1/2 -translate-y-1/2 sidebar-box md:block hidden">
    <div class="sidebar py-3 px-1 relative">
      <div class="icon-box" :class="iconBoxCss">
        <el-icon :style="{fontSize}">
          <Avatar/>
        </el-icon>
      </div>
      <el-divider style="margin: 12px 0"/>
      <draggable
          :list="navList"
          item-key="index"
          animation="500"
          class="sidebar-content"

      >
        <template #item="{element,index}">
          <div
              class="icon-box mb-2"
              :class="[workId === element.id && 'bg-white-26',iconBoxCss]"
              @click="workId = element.id"
              :key="element.id"
              @contextmenu.prevent="rightWorkClick(element.id)"
          >
            <el-tooltip
                class="box-item"
                effect="dark"
                :content="element.name"
                placement="left"
                :key="index"
            >
              <el-icon :style="{fontSize}">
                <component :is="element.icon"></component>
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </draggable>
      <div class="relative px-1">
        <el-divider style="margin: 12px 0"/>
        <div class="popover-box">
          <el-popover
              placement="left"
              :width="200"
              trigger="click"
              popper-class="my-popper"
              :show-arrow="false"
              ref="popoverRef"
          >
            <template #reference>
              <div class="icon-box" :class="iconBoxCss">
                <el-icon style="font-size:21px">
                  <CirclePlus/>
                </el-icon>
              </div>
            </template>
            <div>
              <el-input
                  maxlength='6'
                  clearable
                  v-model="newWorkArea.name"
                  show-word-limit
              />
              <div class="grid grid-cols-5 gap-3 my-3">
                <div
                    v-for="item in ICON_BOX"
                    class="cursor-pointer p-1 flex-center rounded-md duration-200"
                    :class="[newWorkArea.icon === item && 'bg-white']"
                    @click="newWorkArea.icon = item"
                >
                  <el-icon
                      size="22px"
                  >
                    <component :is="item"></component>
                  </el-icon>
                </div>
              </div>
              <el-button
                  type="primary"
                  class="w-full"
                  @click="handleCreateWork"
              >
                添加分类
              </el-button>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
    <!--      <div class="flex-center cursor-pointer mt-1">-->
    <!--        <div class="more-btn flex-center rounded-md">-->
    <!--          <el-icon style="color: rgba(255,255,255,.8)">-->
    <!--            <More/>-->
    <!--          </el-icon>-->
    <!--        </div>-->
    <!--      </div>-->
  </div>
<!--  &lt;!&ndash;  工作区&ndash;&gt;-->
<!--  <div v-show="workVisible" :style="{left:workLeft+'px',top:workTop+'px'}" class="contextmenu">-->
<!--    <div class="menu edit-btn" @click="handleEditWork">-->
<!--      <el-icon class="menu-icon">-->
<!--        <Edit/>-->
<!--      </el-icon>-->
<!--      <span>编辑</span>-->
<!--    </div>-->
<!--    <div class="menu delete-btn" @click="handleDelWork">-->
<!--      <el-icon class="menu-icon delete-color">-->
<!--        <Delete/>-->
<!--      </el-icon>-->
<!--      <span class="delete-color">删除</span>-->
<!--    </div>-->
<!--  </div>-->
  <div
      v-if="show"
      class="tool-box"
      :style="{maxWidth:`${maxWidth}px`}"
  >
    <draggable
        :list="getNavListChild()"
        item-key="index"
        animation="500"
        v-show="!isFocus"
        class="tool-grid duration-200"
        :style="{
                    gridTemplateColumns:`repeat(auto-fill,${size+gapY}px)`,
                    gridTemplateRows:`repeat(auto-fill,${size+gapX+30}px)`,
               }"
    >
      <template #item="{element,index}">
        <div
            class="tool-item"
            :style="{
                           padding: `0 ${gapY/2}px ${gapX}px`,
                           width:`${size + gapY}px`,
                           height:`${size+ gapX}px`
                        }"
            :key="index"
            @contextmenu.prevent="rightClick($event,index)"
            @touchstart.prevent="touchStart($event,index)"
            @touchmove="touchMove()"
            @touchend="touchEnd()"
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
               @click="handleEditOpen"
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
  <MyDialog v-model:dialogVisible="editDialogVisible">
    <template #title>
      快捷导航设置
    </template>
    <template #content>
      <div v-loading="loading" class="flex justify-center items-start flex-col text-base prefix-text-color">
        <div class="py-3 shortcut-box">
          <div>名称</div>
          <MyInput v-model="toolObj.name"/>
        </div>
        <div class="py-3 shortcut-box">
          <div>网址</div>
          <MyInput v-model="toolObj.url"/>
        </div>
        <div class="py-3 shortcut-box">
          <div class="flex-none">图标</div>
          <div class="flex-center ml-3">
            <div class="shortcut-icon-box">
              <div class="font-bold" v-if="toolObj.type==='text'">{{ toolObj.src }}</div>
              <img v-if="toolObj.type==='icon'" class="shortcut-icon" :src="toolObj.src" alt="">
            </div>
            <div class="ml-3 flex flex-wrap justify-start">
              <div class="m-1">
                <el-button round @click="getIcon">智能</el-button>
              </div>
              <div class="m-1">
                <el-button round @click="getText">文字</el-button>
              </div>
              <el-button class="m-1" @click="getDefault" round>默认</el-button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #bottom>
      <el-button @click="handleEditClose">取 消</el-button>
      <el-button v-if="currentIndex === null" type="primary" @click="handleSaveTool">确 定</el-button>
      <el-button v-if="currentIndex !== null" type="primary" @click="handleUpdateTool">更 新</el-button>
    </template>
  </MyDialog>
  <div v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
    <div class="menu edit-btn" @click="handleEditTool">
      <el-icon class="menu-icon">
        <Edit/>
      </el-icon>
      <span>编辑</span>
    </div>
    <div class="menu delete-btn" @click="handleDelTool">
      <el-icon class="menu-icon delete-color">
        <Delete/>
      </el-icon>
      <span class="delete-color">删除</span>
    </div>
  </div>
</template>
<script setup>
import {reactive, ref, toRefs, watch} from "vue";
import MyInput from '../components/my-input.vue'
import MyDialog from '../components/my-dialog.vue'
import RightPopover from '../components/right-popover.vue'
import {ElMessage} from "element-plus";
import store from 'store'
import {get_url_icon} from "../service/service.js";
import {IMG_URL, ICON_BOX} from "../utils/index.js";
import draggable from 'vuedraggable'
import {v4 as uid} from 'uuid'


const props = defineProps({
  toolSetting: Object,
  isFocus: Boolean
})

const {
  show,
  size,
  radius,
  opacity,
  gapX,
  gapY,
  maxWidth
} = toRefs(props.toolSetting)

//快捷方式
const toolObj = reactive({
  name: "",
  url: "",
  src: `${IMG_URL}default.png`,
  type: "icon",
})

//侧边栏css
const iconBoxCss = 'cursor-pointer flex-center flex-col p-2 rounded-md'
const fontSize = '18px'

//默认的工作区
const workId = ref(
    store.get('workId') ?
        store.get('workId')
        :
        'zhuye'
)

const navList = reactive(
    store.get('navList') ?
        store.get('navList')
        :
        [
          {
            id: 'zhuye',
            name: "主页",
            icon: 'HomeFilled',
            children: [
              {
                "name": "gitee",
                "url": "https://gitee.com/",
                "src": "https://api.qqsuu.cn/api/dm-get?url=https%3A%2F%2Fgitee.com%2F",
                "type": "icon"
              },
              {
                "name": "ele",
                "url": "https://element-plus.gitee.io",
                "src": "https://qiniu.imyuanli.cn/mini/default.png",
                "type": "icon"
              },
              {
                "name": "csdn",
                "url": "https://blog.csdn.net/JAMBO808/article/details/123942817",
                "src": "https://api.qqsuu.cn/api/dm-get?url=https%3A%2F%2Fblog.csdn.net%2FJAMBO808%2Farticle%2Fdetails%2F123942817",
                "type": "icon"
              },
              {
                "name": "123",
                "url": "https://github.com/SortableJS/vue.draggable.next",
                "src": "https://api.qqsuu.cn/api/dm-get?url=https%3A%2F%2Fgithub.com%2FSortableJS%2Fvue.draggable.next",
                "type": "icon"
              }],
          },
          {
            id: 'chengxuyuan',
            name: "程序员",
            icon: 'Cpu',
            children: [
              {
                "name": "csdn",
                "url": "https://blog.csdn.net/JAMBO808/article/details/123942817",
                "src": "https://api.qqsuu.cn/api/dm-get?url=https%3A%2F%2Fblog.csdn.net%2FJAMBO808%2Farticle%2Fdetails%2F123942817",
                "type": "icon"
              }
            ],
          },
          {
            id: 'sheji',
            name: "设计",
            icon: 'EditPen',
            children: [
              {
                "name": "gitee",
                "url": "https://gitee.com/",
                "src": "https://api.qqsuu.cn/api/dm-get?url=https%3A%2F%2Fgitee.com%2F",
                "type": "icon"
              }
            ],
          },
        ]
)
//获取对应的nav children
const getNavListChild = () => {
  const res = navList.find(item => {
    return item.id === workId.value
  })
  return res.children
}

//popoverRef
const popoverRef = ref()

//新工作区数据
const newWorkArea = reactive({
  id: '',
  name: '主页',
  icon: 'HomeFilled',
  children: []
})

//关闭popover 并清空数据
const handleClosePopover = () => {
  popoverRef.value.hide()
  newWorkArea.name = "主页"
  newWorkArea.icon = "HomeFilled"
}

//增工作区
const handleCreateWork = () => {
  const id = uid()
  newWorkArea.id = id
  navList.push({...newWorkArea})
  workId.value = id
  handleClosePopover()
}
//工作区右键弹窗
//右键弹窗
// const workVisible = ref(false)
// const workTop = ref(0)
// const workLeft = ref(0)
// const rightWorkClick = (id) => {
//   console.log(id)
// }
//删

//改


//获取网站图标
const loading = ref(false)
const getIcon = () => {
  if (!toolObj?.url) {
    ElMessage({
      message: '请先填写网址',
      type: 'warning',
    })
    return
  }
  loading.value = true
  get_url_icon({url: toolObj?.url}).then(
      (res) => {
        if (res) {
          toolObj.src = res
          toolObj.type = 'icon'
          loading.value = false
        }
      }
  )
}
//图标是文字
const getText = () => {
  if (!toolObj?.name) {
    ElMessage({
      message: '请先填写网站名称',
      type: 'warning',
    })
    return
  }
  toolObj.src = toolObj?.name[0]
  toolObj.type = 'text'
}
//默认
const getDefault = () => {
  toolObj.src = `${IMG_URL}default.png`
  toolObj.type = 'icon'
}
//重置toolobj
const clearObj = () => {
  toolObj.name = ""
  toolObj.url = ""
  toolObj.src = `${IMG_URL}default.png`
  toolObj.type = "icon"
}

//保存
const handleSaveTool = () => {
  if (!toolObj?.name) {
    ElMessage({
      message: '未填写名称',
      type: 'warning',
    })
    return
  }
  if (!toolObj?.url) {
    ElMessage({
      message: '未填写网址',
      type: 'warning',
    })
    return
  }
  const children = getNavListChild()
  children.push({...toolObj})
  clearObj()
  handleEditClose()
}
//更新
const handleUpdateTool = () => {
  if (!toolObj?.name) {
    ElMessage({
      message: '未填写名称',
      type: 'warning',
    })
    return
  }
  if (!toolObj?.url) {
    ElMessage({
      message: '未填写网址',
      type: 'warning',
    })
    return
  }
  const children = getNavListChild()
  children[currentIndex.value] = {...toolObj}
  clearObj()
  handleEditClose()
}

//编辑
const handleEditTool = () => {
  const children = getNavListChild()
  let obj = {...children[currentIndex.value]}
  toolObj.name = obj.name
  toolObj.url = obj.url
  toolObj.src = obj.src
  toolObj.type = obj.type
  handleEditOpen()
}

//删除 tool
const handleDelTool = () => {
  const children = getNavListChild()
  children.splice(currentIndex.value, 1)
}

//编辑弹框
const editDialogVisible = ref(false)
const handleEditOpen = () => editDialogVisible.value = true
const handleEditClose = () => {
  editDialogVisible.value = false
  currentIndex.value = null
  clearObj()
}

//右键弹窗
const visible = ref(false)
const top = ref(0)
const left = ref(0)

//当前操作的index
const currentIndex = ref(null)
//打开menu
const openMenu = (x, y) => {
  left.value = x;
  top.value = y;
  visible.value = true;
}
//右键打开
const rightClick = (e, index) => {
  openMenu(e.pageX, e.pageY)
  currentIndex.value = index
}
//关闭
const closeMenu = () => {
  top.value = 0;
  left.value = 0;
  visible.value = false;
  // currentIndex.value = null
}
//移动端长按
let timeOutEvent
//长按事件（起始）
const touchStart = (e, index) => {
  timeOutEvent = setTimeout(() => {
    //真正长按后应该执行的内容
    timeOutEvent = 0;
    const touches = e.touches[0]
    currentIndex.value = index
    openMenu(touches.pageX, touches.pageY)
  }, 500); //这里设置定时器，定义长按500毫秒触发长按事件
  return false;
}
//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
const touchEnd = () => {
  clearTimeout(timeOutEvent); //清除定时器
  if (timeOutEvent !== 0) {
    //这里写要执行的内容（如onclick事件）
    console.log("点击但未长按");
  }
  return false;
}
//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
const touchMove = () => {
  clearTimeout(timeOutEvent); //清除定时器
  timeOutEvent = 0;
}

//持久化存储
watch(workId, () => {
  store.set('workId', workId.value)
})
watch(navList, (newTool) => {
  store.set("navList", newTool)
})
//全局监听
watch(visible, (newValue, oldValue) => {
  if (newValue) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
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

/*屏幕小于768的时候*/
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


/*工作区*/
.sidebar-box {
  height: 40%;
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
}
</style>