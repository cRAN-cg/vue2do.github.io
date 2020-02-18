
<template v-if="value && max" >
  <svg class="progress-ring" viewBox="-50,-50,100,100">
    <circle class="progress-ring-circle" r="46" />
    <path class="progress-ring-ring" stroke-dashoffset="0" :d="path(value, max)" />
    <circle
      class="progress-ring-end"
      stroke-dashoffset="0"
      :cx="endX(value, max)"
      :cy="endY(value, max)"
      r="4"
    />
    <text alignment-baseline="middle" text-anchor="middle">
      {{`${value.length} /\ ${max.length}`}}</text>
  </svg>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: mapState({
    value: state => state.items.active,
    max: state => state.items.todo,
    min: () => 0,
  }),
  methods: {
    theta(value, max) {
      if (!value || !max) {
        return 0;
      }
      const frac = value.length / max.length || 0;
      // eslint-disable-next-line no-mixed-operators
      return frac * 2 * Math.PI - 0.000003;
    },
    path(value, max) {
      const large = this.theta(value, max) > Math.PI;
      return `M0,-46 A46,46,0,${large ? 1 : 0},1,${this.endX(
        value,
        max,
      )},${this.endY(value, max)}`;
    },
    endX(value, max) {
      // eslint-disable-next-line no-mixed-operators
      return Math.cos(this.theta(value, max) - Math.PI * 0.5) * 46;
    },
    endY(value, max) {
      // eslint-disable-next-line no-mixed-operators
      return Math.sin(this.theta(value, max) - Math.PI * 0.5) * 46;
    },
  },
};
</script>

<style scoped>
body {
  font-family: sans-serif;
}

.progress-ring {
  width: 100px;
  height: 100px;
}

.progress-ring-circle {
  stroke: rgba(0, 0, 0, 0);
  stroke-width: 1;
  fill: none;
}

.progress-ring-ring {
  stroke: #007fff;
  stroke-width: 2;
  fill: none;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 16s linear;
}

.progress-ring-end {
  fill: #007fff;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 16s linear;
}
</style>
