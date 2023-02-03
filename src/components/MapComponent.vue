<template>
  <div class="section">
    <trading-vue
      :data="chart"
      :height="height"
      :width="width"
      titleTxt="HEAT MAP"
      :indexBased="true"
      :toolbar="true"
      :overlays="overlays"
      :extensions="ext"
      :legend-buttons="['display', { name: 'aumentar', icon: icon }]"
      v-on:legend-button-click="on_button_click"
      :chartConfig="{
        modal: modalHeat,
        contrast: contrast,
        MIN_ZOOM: 1,
      }"
    ></trading-vue>
    <article class="loader_modal" v-if="load">
      <div class="loader"></div>
    </article>
    <!-- <span v-if="modalHeat" class="modal">
      <input
        type="range"
        min="1"
        max="100"
        value="50"
        class="slider"
        id="myRange"
      /> -->
    <!-- </span> -->
  </div>
</template>
<script>
import { TradingVue, DataCube } from "trading-vue-js";
import XP from "tvjs-xp";
import Data from "/src/data/heatdata.json";
import HeatMap from "./HeatMap.vue"; //

// const URL = `https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=10`;
const WSH = `wss://stream.binance.com:9443/ws/btcusdt@kline_1m`;
const WSS = `wss://stream.binance.com:9443/ws/btcusdt@depth@1000ms`;


export default {
  name: "MapComponent",
  components: { TradingVue },
  data() {
    return {
      data: new DataCube(Data),
      ext: Object.values(XP),
      overlays: [HeatMap],
      heightNav: document.querySelector("nav").offsetHeight,
      height: window.innerHeight - 10,
      width: window.innerWidth,
      modalHeat: true,
      contrast: 1,
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEU0OkArMjhobHEoPUPFEBIuO0L+AAC2FBZ2JyuNICOfGx7xAwTjCAlCNTvVDA1aLzQ3COjMAAAAVUlEQVQI12NgwAaCDSA0888GCItjn0szWGBJTVoGSCjWs8TleQCQYV95evdxkFT8Kpe0PLDi5WfKd4LUsN5zS1sKFolt8bwAZrCaGqNYJAgFDEpQAAAzmxafI4vZWwAAAABJRU5ErkJggg==",
      chart: {},
      load: true,
    };
  },
  beforeMount() {
    this.height -= this.heightNav;
    const socketChart = new WebSocket(WSH);
    const socketOnChart = new WebSocket(WSS);
    this.chart = new DataCube({
      chart: {
        type: "Candles",
        data: [],
      },
      onchart: [
        {
          name: "Bid/Ask",
          type: "HeatMap",
          data: [],
        },
      ],
    });
    socketChart.addEventListener("message", async (e) => {
      this.parse_candle(JSON.parse(e.data));
      // let orderBookDataFetched = await this.load_data();
      // console.log(orderBookDataFetched);
    });
    socketOnChart.addEventListener("message", (e) => {
      this.parse_orderBookData(JSON.parse(e.data));
    });
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight - this.heightNav;
    });
    const timeOut = setInterval(() => {
        console.log(this.chart.data.chart.data.length);
        if (this.chart.data.chart.data.length >= 2) {
          this.load = false;
          clearInterval(timeOut);
        }
      }, 4000);
    // let slider = document.getElementById("myRange");
    // slider.oninput = function (e) {
    //   this.contrast = e.target.value
    // };
  },
  methods: {
    listen_loader() {
      
    },
    // async load_data() {
    //   return await fetch(URL).then((r) => r.json());
    // },
    parse_candle(data) {
      data = Object.values(data.k);
      let array = data
        .filter((x, i, arr) => {
          if (i == 0 || i == 6 || i == 7 || i == 8 || i == 9 || i == 11) {
            return x;
          }
        })
        .map((y) => parseFloat(y));
      [array[2], array[3], array[4]] = [array[3], array[4], array[2]];

      this.fill_chart(array);
    },
    parse_orderBookData(data) {
      let orderBookData = Object.values(data);
      let timestamp = orderBookData[1];

      this.fill_onchart(orderBookData[5], orderBookData[6], timestamp);
    },
    fill_chart(newData) {
      // this.chart.update({candle: newData})

      this.chart.merge("chart.data", [newData]);
    },
    fill_onchart(bid, ask, timestamp) {
      bid.map((x) => {
        this.chart.data.onchart[0].data.push([
          timestamp,
          parseFloat(x[0]),
          parseFloat(x[1]),
          "bid",
        ]);
        return true;
      });
      ask.map((x) => {
        this.chart.data.onchart[0].data.push([
          timestamp,
          parseFloat(x[0]),
          parseFloat(x[1]),
          "ask",
        ]);

        return true;
      });

      // this.chart.merge("onchart.HeatMap.data", [
      //   [newData[3], newData[0], newData[1], newData[2]],
      // ]);
    },
    on_button_click(e) {
      if (e.button == "aumentar") {
        this.modalHeat = !this.modalHeat;
        this.contrast = this.modalHeat ? 0.2 : 2;
      }
    },
  },
};
</script>

<style scoped>
.section {
  position: relative;
}
/* .modal {
  position: absolute;
  width: 20rem;
  height: 20rem;
  top: 2rem;
  right: 20rem;
} */
.loader_modal {
  position: absolute;
  width: 100%;
  height: 100vh - 2rem;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  place-content: center;
}
.loader {
  display: flex;
  align-content: center;
  justify-content: center;
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>