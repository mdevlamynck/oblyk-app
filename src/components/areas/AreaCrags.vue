<template>
  <div>
    <div
      v-for="crag in crags"
      :key="crag.id"
      class="area-crags-list"
    >
      <div class="area-crag-card">
        <crag-small-card :crag="crag" class="mb-3"/>
      </div>
      <div class="area-crag-action text-center">
        <v-btn
          v-if="isLoggedIn"
          :title="$t('components.area.removeFromArea')"
          icon
          @click="removeCrag(crag)"
        >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div v-if="isLoggedIn" class="mt-3">
      <v-btn
        text
        :to="area.path('add-crag')"
        color="primary"
      >
        <v-icon
          left
        >
          mdi-terrain
        </v-icon>
        {{ $t('components.area.addCragInArea') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import CragSmallCard from '@/components/crags/CragSmallCard'
import AreaApi from '@/services/oblyk-api/AreaApi'

export default {
  name: 'AreaCrags',
  components: { CragSmallCard },
  mixins: [SessionConcern],
  props: {
    crags: Array,
    area: Object
  },

  methods: {
    removeCrag: function (crag) {
      if (confirm(this.$t('actions.areYouSur'))) {
        AreaApi
          .removeCrag(this.area.id, crag.id)
          .then(() => {
            this.$router.go(0)
          })
          .catch(err => {
            this.$root.$emit('alertFromApiError', err, 'area')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.area-crags-list {
  .area-crag-card, .area-crag-action {
    display: inline-block;
  }
  .area-crag-card {
    width: calc(100% - 100px);
  }
  .area-crag-action {
    width: 90px;
    height: 100px;
    vertical-align: top;
    line-height: 80px;
  }
}
</style>
