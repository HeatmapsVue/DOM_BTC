<template>
<div>
<SelectComponent @changeChart="changeChart" id="select"/>
<ChartComponent v-bind:isChange="isChange" :key="chartReload"/>
</div>
</template>
<script setup>
import  SelectComponent  from "@/components/SelectComponent.vue";
import  ChartComponent  from "@/components/ChartComponent.vue";
import { ref } from "vue";

const isChange = ref()
let chartReload = ref(0)
const changeChart = (value) => {
  isChange.value = value
  chartReload.value++
}

</script>
<style scoped>
div{
  background-color: #121826;
}
</style>