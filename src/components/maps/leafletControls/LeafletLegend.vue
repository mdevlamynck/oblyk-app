<template>
  <div class="leaflet-bar">
    <a v-if="!showLegend" @click.prevent="showLegend = true">
      <v-icon light small>mdi-map-legend</v-icon>
    </a>
    <div class="leaflet-customer-control" v-if="showLegend">
      <ul>
        <li class="oblyk-legend-boulder">{{ $t('components.map.legend.boulder') }}</li>
        <li class="oblyk-legend-sport-climbing">{{ $t('components.map.legend.sportClimbing') }}</li>
        <li class="oblyk-legend-multi-pitch">{{ $t('components.map.legend.multiPitch') }}</li>
        <li class="oblyk-legend-deep-water">{{ $t('components.map.legend.deepWater') }}</li>
        <li class="oblyk-legend-via-ferrata">{{ $t('components.map.legend.viaFerrata') }}</li>
        <li class="oblyk-legend-fun-climbing">{{ $t('components.map.legend.funClimbing') }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeafletLegend',

  data () {
    return {
      showLegend: false
    }
  },

  mounted () {
    this.$root.$on('hideLeafletMapLegend', () => { this.showLegend = false })
  },

  beforeDestroy () {
    this.$root.$off('hideLeafletMapLegend')
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding-left: 0;
  list-style-type: none;
  li {
    &:before {
      content: '';
      display: inline-block;
      height: 12px;
      width: 12px;
      margin-right: 10px;
      border-radius: 50%;
    }
    &.oblyk-legend-boulder:before { background-color: #ffcb00; }
    &.oblyk-legend-sport-climbing:before { background-color: #3a71c7; }
    &.oblyk-legend-multi-pitch:before { background-color: #ff5656; }
    &.oblyk-legend-deep-water:before { background-color: #86ccdd; }
    &.oblyk-legend-via-ferrata:before { background-color: #3cc770; }
    &.oblyk-legend-fun-climbing:before { background-color: #ff80b2; }
  }
}
</style>
