<template>
  <div>
    <p class="font-weight-bold">
      {{ $t('components.logBook.grades') }}
    </p>
    <div
      class="grade-chart"
      v-bind:class="heightClass"
    >
      <bar-chart
        :data="chartData()"
        :options="{
          responsive: true,
          maintainAspectRatio: false,
          legend: { display: false },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
        }"
      />
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/charts/BarChart'
import { GradeMixin } from '@/mixins/GradeMixin'

export default {
  name: 'LogBookGradeChart',
  mixins: [GradeMixin],
  components: { BarChart },
  props: {
    data: Object,
    heightClass: {
      type: String,
      default: 'height-200'
    }
  },

  methods: {
    chartData: function () {
      const labels = []
      for (const label of this.data.labels) {
        labels.push(this.gradeValueToText(label))
      }

      return {
        datasets: [{
          data: this.data.datasets[0].data,
          backgroundColor: this.data.datasets[0].backgroundColor,
          label: this.$t('common.number')
        }],
        labels: labels
      }
    }
  }
}
</script>

<style scoped lang="scss">
.grade-chart {
  flex-grow: 1;
  min-height: 0;

  > div {
    position: relative;
    height: 100%;
  }

  &.height-200 {
    height: 200px
  }

  &.height-250 {
    height: 250px
  }
}
</style>
