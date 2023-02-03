<template>
  <div>
    <trading-vue
      :data="chart"
      :width="width"
      :height="height"
      titleTxt="BTCUSDT"
      :indexBased="true"
      :toolbar="true"
      :extensions="ext"
      :legend-buttons="['display','add', 'remove']" 
      :overlays = "overlays"
      :chartConfig="{
        MIN_ZOOM: 1,
      }"
    />
  </div>
</template>
<script setup>
import XP from 'tvjs-xp'
import { TradingVue, DataCube} from "trading-vue-js";
import {
  onBeforeMount,
  reactive,
  ref,
} from "vue";

import DataStatic from "/src/data/data.json";
import DataDynamic from "/src/data/data2.json";
import Overlays from "tvjs-overlays";

const ext = Object.values(XP);
const overlays = Object.values(Overlays)
const props = defineProps({
  isChange: {
    type: Boolean,
    default: true,
  },
});


let heightNav = document.querySelector('nav').offsetHeight;

let chart = reactive(new DataCube(props.isChange?DataDynamic:DataStatic));
let width = ref(window.innerWidth);
let height = ref(window.innerHeight - heightNav - 80);

if (props.isChange) {
  const webSocketHost = "wss://stream.binance.com:9443/ws/btcusdt@kline_1s";
  const socket = new WebSocket(webSocketHost);
  onBeforeMount(() => {
    socket.addEventListener("message", (event) => {
      let chartData = JSON.parse(event.data);

      chart.data.chart.data.push([
        chartData.k.T,
        parseInt(chartData.k.o),
        parseInt(chartData.k.h),
        parseInt(chartData.k.l),
        parseInt(chartData.k.c),
        parseInt(chartData.k.n),
      ]);
    });
  });
}

window.addEventListener("resize", () => {
  width.value = window.innerWidth;
  height.value = window.innerHeight - heightNav - 80;
});
</script>
