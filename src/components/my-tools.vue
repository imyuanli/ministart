<template>
  <div class="absolute left-1/2 -translate-x-1/2  top-60 navboxCustom">
    <div class="grid gap-2  md:gap-4 justify-items-center grid-cols-4 lg:grid-cols-8 md:grid-cols-7 sm:grid-cols-6">
      <div class="flex-center flex-col">
        <div class="flex-center mb-1 customNav">
          <el-icon class="icon-plus" style="">
            <Plus/>
          </el-icon>
        </div>
        <div class="text-white text-center text-sm lg:text-lg md:text-base overflow-ellipsis truncate w-1/2">翻译</div>
      </div>
      <div class="flex-center flex-col customNav">
        <el-icon class="icon-plus" style="">
          <Plus/>
        </el-icon>
      </div>
    </div>
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
.navboxCustom {
  height: 45%;
  max-width: 800px;
  width: 90%;
  color: #fff;
  transition: .25s;
  overflow-y: auto;
}

.navboxCustom::-webkit-scrollbar {
  display: none;
}

.customNav {
  width: 80px;
  height: 80px;
  margin: 5px;
  border-radius: 15px;
  text-align: center;
  background-color: rgba(255, 255, 255, .1);
  cursor: pointer;
  transition: background-color .35s;
  backdrop-filter: blur(40px) saturate(1.5);
}

@media (max-width: 1024px) {
  .customNav {
    width: 75px;
    height: 75px;
  }
}

@media (max-width: 768px) {
  .customNav {
    width: 70px;
    height: 70px;
  }
}

/*屏幕小于768的时候*/
@media (max-width: 640px) {
  .customNav {
    width: 60px;
    height: 60px;
  }
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