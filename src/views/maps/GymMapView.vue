<template>
  <leaflet-map
    map-style="indoor"
    :geo-jsons="geoJsons"
    :latitude-force="latitude"
    :longitude-force="longitude"
    :zoom-force="zoom"
  />
</template>

<script>
import LeafletMap from '@/components/maps/LeafletMap'
import GymApi from '@/services/oblyk-api/GymApi'
import store from '@/store'

export default {
  name: 'GymMapView',
  components: { LeafletMap },

  metaInfo () {
    return {
      title: this.$t('meta.gymMap.title'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.gymMap.description') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.gymMap.title') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.gymMap.description') },
        { vmid: 'og-url', property: 'og:url', content: `${process.env.VUE_APP_OBLYK_APP_URL}/maps/gyms` }
      ]
    }
  },

  data () {
    return {
      geoJsons: null,
      latitude: null,
      longitude: null,
      zoom: null
    }
  },

  mounted () {
    this.getGeoJson()
  },

  created () {
    const urlParams = new URLSearchParams(window.location.search)
    this.latitude = urlParams.get('lat')
    this.longitude = urlParams.get('lng')
    this.zoom = this.latitude !== null ? 15 : null
  },

  methods: {
    getGeoJson: function () {
      store.commit('loader/START_LOADING')
      GymApi
        .geoJson()
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
</script>
