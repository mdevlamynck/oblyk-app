<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        mdi-map
      </v-icon>
      {{ $t('components.user.climbersMap') }}
    </v-card-title>
    <v-card-text>
      {{ user.first_name }} {{ $t('common.practice') }}
      <v-chip
        small
        class="ma-1"
        v-for="climb in user.climbingTypes()"
        :key="climb"
      >
        {{ $t(`models.climbs.${climb}`) }}
      </v-chip>
      {{ $t('common.between') }}
      <strong>{{ gradeValueToText(user.grade_min) || '2a' }}</strong>
      {{ $t('common.and') }}
      <strong>{{ gradeValueToText(user.grade_max) || '∞' }}</strong>.

      <leaflet-map
        class="user-partner-map"
        map-style="outdoor"
        :track-location="false"
        :clustered="false"
        :geo-jsons="geoJsons"
      />
      <div class="text-right mt-2">
        <v-btn
          text
          small
          :to="`/maps/climbers?lat=${user.partner_latitude}&lng=${user.partner_longitude}`"
        >
          {{ $t('components.user.openClimbersMap') }}
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { GradeMixin } from '@/mixins/GradeMixin'
import LeafletMap from '@/components/maps/LeafletMap'
import UserApi from '@/services/oblyk-api/UserApi'

export default {
  name: 'UserPartnerMap',
  components: { LeafletMap },
  mixins: [GradeMixin],
  props: {
    user: Object
  },

  data () {
    return {
      geoJsons: null
    }
  },

  mounted () {
    this.getUserGeoJson()
  },

  methods: {
    getUserGeoJson: function () {
      UserApi
        .userPartnerGeoJson(this.user.uuid)
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
          setTimeout(() => {
            this.$root.$emit('fitMapOnGeoJsonBounds')
          }, 1000)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.user-partner-map {
  margin-top: 0.5em;
  border-radius: 5px;
  height: 400px;
}
</style>
