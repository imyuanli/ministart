<template>
  <div class="absolute-center top-56">
    <div class="grid gap-5 grid-cols-5 justify-items-center grid-rows-4">
      <div class="flex-center flex-col">
        <div class="flex-center mb-1 customNav">
          <el-icon class="icon-plus mb-3" style="">
            <Plus/>
          </el-icon>

        </div>
        <div class="text-white text-base overflow-ellipsis truncate ">1232123212321232</div>
      </div>

      <div class="flex-center flex-col customNav">
        <el-icon class="icon-plus" style="">
          <Plus/>
        </el-icon>
      </div>
      <div class="flex-center flex-col customNav">
        <el-icon class="icon-plus" style="">
          <Plus/>
        </el-icon>
      </div>
      <div class="flex-center flex-col customNav">
        <el-icon class="icon-plus" style="">
          <Plus/>
        </el-icon>
      </div>
      <div class="flex-center flex-col customNav">
        <el-icon class="icon-plus" style="">
          <Plus/>
        </el-icon>
      </div>
      <div class="flex-center flex-col customNav">
        <el-icon class="icon-plus" style="">
          <Plus/>
        </el-icon>
      </div>
      <div class="flex-center flex-col customNav">
        <el-icon class="icon-plus" style="">
          <Plus/>
        </el-icon>
      </div>
      <div class="flex-center flex-col customNav">
        <el-icon class="icon-plus" style="">
          <Plus/>
        </el-icon>
      </div>
      <div class="flex-center flex-col customNav">
        <el-icon class="icon-plus" style="">
          <Plus/>
        </el-icon>
      </div>
    </div>
    <!--    <div class="item">-->
    <!--      <div>-->
    <!--        <div v-if="items.iconObj.isText">-->
    <!--          123-->
    <!--        </div>-->
    <!--        <div v-if="!items.iconObj.isText">-->
    <!--          <img class="edit-icon" :src="items.iconObj.data" alt="">-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <span class="item-title">{{ items.title }}</span>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
const shortcuts_list = [
  {
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶',
    disabled: true
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }]
</script>

<style scoped>
.customNav {
  width: 80px;
  height: 80px;
  border-radius: 15px;
  text-align: center;
  background-color: rgba(255, 255, 255, .1);
  cursor: pointer;
  transition: background-color .35s;
  backdrop-filter: blur(40px) saturate(1.5);
}

.icon-plus {
  color: rgba(255, 255, 255, .5);
  font-size: 32px;
}


.customNav:hover {
  background: rgba(255, 255, 255, .5);
}

.customNav:hover .icon-plus {
  color: rgba(0, 0, 0, .5);
}


</style>