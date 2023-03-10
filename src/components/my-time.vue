<template>
  <div v-if="show" class="flex-center flex-col">
    <div
        class="cursor-pointer hover:scale-125 duration-200"
        :style="{
              fontSize:size+'px',
              fontWeight:weight?600:400,
              fontFamily:family,
              color:color,
            }"
    >
      {{ nowTime }}
    </div>
    <div class="text-white w-max" v-show="date">
      <span class="m-1">{{ nowMonth }}</span>
      <span class="m-1">{{ nowWeek }}</span>
      <span class="m-1">{{ nowLunar }}</span>
    </div>
  </div>
</template>

<script setup>
import {onBeforeUnmount, onMounted, ref, toRefs} from "vue";
import dayjs from "dayjs"
import solarLunar from 'solarlunar-es';

const props = defineProps({
  timeSetting: Object
})

const {
  show,
  size,
  weight,
  family,
  color,
  date
} = toRefs(props.timeSetting)

const nowTime = ref()
const nowMonth = ref()
const nowWeek = ref()
const nowLunar = ref()
const getNowTime = () => {
  if (show) {
    const d = dayjs()
    //时间
    nowTime.value = d.format("HH:mm")
    nowMonth.value = d.format("MM[月]DD[日]")
    //星期加农历
    const {ncWeek, monthCn, dayCn} = solarLunar.solar2lunar(d.year(), d.month() + 1, d.date())
    nowWeek.value = ncWeek
    nowLunar.value = monthCn + dayCn
  }
}
//定义 timer 初始值及类型
let timer = null
onMounted(() => {
  getNowTime()
  timer = setInterval(() => {
    getNowTime()
  }, 1000)
})

onBeforeUnmount(() => {
  // 清理定时器要处理 timer 的类型
  clearInterval(Number(timer))
})

</script>

<style scoped>

</style>