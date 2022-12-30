<template>
  <div class="dialog-box">
    <el-dialog
        v-model="visible"
        width="30%"
        align-center
        class="rounded-lg"
        @close="handleChang"
        :close-on-click-modal="false"
    >
      <template #header="{ close, titleId, titleClass }">
        <div class="text-xl text-black font-semibold truncate overflow-ellipsis  flex-center">
          <slot name="title"></slot>
        </div>
      </template>
      <slot name="content"></slot>
      <template #footer>
        <slot name="bottom"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";

//接收的参数
const props = defineProps({
  dialogVisible: Boolean,
  handleChang: Function
})
//监听传入的数据
const visible = ref(false)
watch(props, (newData, oldData) => {
  visible.value = newData.dialogVisible
})
</script>

<style scoped>
.dialog-box:deep(.el-dialog) {
  max-width: 600px;
  width: 90%;
  background-color: #F1F0F5 !important;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 5%) 0 10px 20px;
}

:deep(.el-dialog__body) {
  padding: 35px;
  max-height: 350px;
  overflow: auto;
}

:deep(.el-dialog__body) {
  padding: 15px 35px 0;
}

:deep(.el-dialog__body::-webkit-scrollbar) {
  width: 5px;
}

:deep(.el-dialog__body::-webkit-scrollbar-thumb) {
  background-color: rgba(0, 0, 0, .15);
  border-radius: 5px;
}

:deep(.el-dialog__body::selection) {
  background-color: rgba(92, 161, 255, .35);
}

/*屏幕小于768的时候*/
@media (max-width: 640px) {
  :deep(.el-dialog__body) {
    padding: 15px 20px 0;
  }
}

</style>