<template>
  <div v-if="time" class="absolute left-1/2 -translate-x-1/2 top-24 flex-center flex-col">
    <div
        class="cursor-pointer hover:scale-125 duration-200"
        :style="{
              fontSize:size+'px',
              fontWeight:weight?400:600,
              fontFamily:family,
              color:color,
            }"
    >
      {{ dayjs(new Date()).format("HH:mm") }}
    </div>
    <div>
      {{ dayjs(new Date()).format("MM-DD") }}
    </div>
  </div>
</template>

<script setup>
import {toRefs} from "vue";
import dayjs from "dayjs"

const props = defineProps({
  timeSetting: Object
})

const {
  time,
  size,
  weight,
  family,
  color,
  month,
  week,
  lunar,
} = toRefs(props.timeSetting)
</script>

<style scoped>

</style>