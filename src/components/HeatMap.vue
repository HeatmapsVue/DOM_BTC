<script>
import { Overlay } from "trading-vue-js";

export default {
  name: "HeatMap",
  mixins: [Overlay],
  methods: {
    meta_info() {
      return {
        author: "HeatMapsvue",
        version: "1.0.0",
        desc: "Bid and ask chart",
      };
    },

    draw(ctx) {
      const layout = this.$props.layout;
      let contrast = this.$props.config.contrast
      let sizey = this.$props.layout.A;
      let sizex = this.$props.layout.px_step;
      for (var p of this.$props.data) {
        ctx.beginPath();
        let x = layout.t2screen(p[0]);
        let y = layout.$2screen(p[1]);
        let c = p[2]*contrast;
        let o = p[3];
        let color = this.COLORS[o];
        ctx.fillStyle = `${color}${c})`;
        ctx.fillRect(x-sizex,y,sizex,sizey)
        ctx.stroke();
      }
      
    },
    use_for() {
      return ["HeatMap"];
    },
    legend(values) {
      let x = values[1];
      return [
        {
          value: x,
          color: this.LEYENDCOLORS['bid'],
        },
        {
          value: x,
          color: this.LEYENDCOLORS['ask'],
        }
      ];
    },
  },
  computed: {
  },
  data() {
    return {
      COLORS: {
        bid: "rgba(74, 35, 90 ,",
        ask: "rgba(27, 79, 114 ,",
      },
      LEYENDCOLORS: {
        bid: "#B30CF8",
        ask: "#0098FF",
      },
    };
  }
};
</script>