<template>
  <l-map
    ref="leafletMap"
    :zoom="zoom"
    :center="center"
    :options="{
      zoomControl: false,
      worldCopyJump: true,
      scrollWheelZoom: scrollWheelZoom
    }"
    @click="hideOpensControl"
    @move="savePosition"
    @zoom="saveZoom"
  >
    <!-- Zoom Control -->
    <l-control-zoom position="topright" />

    <!-- Layer Selector -->
    <l-control position="topright" >
      <leaflet-layer-selector v-model="layerIndex" :map-style="mapStyle" />
    </l-control>

    <!-- Legend -->
    <l-control position="bottomright">
      <leaflet-legend />
    </l-control>

    <!-- Layer -->
    <l-tile-layer
      :url="layer.url"
      :attribution="layer.attribution"
    />

    <!-- GeoJson & Marker cluster if clustered -->
    <v-marker-cluster
      v-if="clustered"
      :options="{ disableClusteringAtZoom: 12 }"
    >
      <l-geo-json
        v-for="(geojson, index) in geoJsons"
        :key="`geosjon-${index}`"
        :geojson="geoJsons"
        :options="geoJsonOptions"
      />
    </v-marker-cluster>

    <!-- GeoJson & Marker cluster if not clustered -->
    <l-geo-json
      v-if="!clustered"
      :geojson="geoJsons"
      :options="geoJsonOptions"
    />
  </l-map>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LControlZoom, LGeoJson, LControl } from 'vue2-leaflet'
import { MapPopupHelpers } from '@/mixins/MapPopupHelpers'
import { MapMarkerHelpers } from '@/mixins/MapMarkerHelpers'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import LeafletLayerSelector from '@/components/maps/leafletControls/LeafletLayerSelector'
import LeafletLegend from '@/components/maps/leafletControls/LeafletLegend'

export default {
  name: 'LeafletMap',
  mixins: [MapPopupHelpers, MapMarkerHelpers],

  props: {
    mapStyle: String,
    geoJsons: Object,
    trackLocation: {
      type: Boolean,
      required: false,
      default: true
    },
    zoomForce: {
      type: Number,
      required: false
    },
    latitudeForce: {
      type: [Number, String],
      required: false
    },
    longitudeForce: {
      type: [Number, String],
      required: false
    },
    scrollWheelZoom: {
      type: Boolean,
      required: false,
      default: true
    },
    clustered: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  components: {
    LeafletLegend,
    LeafletLayerSelector,
    LMap,
    LGeoJson,
    LControl,
    LControlZoom,
    LTileLayer,
    'v-marker-cluster': Vue2LeafletMarkerCluster
  },

  data () {
    return {
      map: null,
      showLayersSelector: false,
      layerIndex: 0,
      zoom: this.zoomForce || parseFloat(localStorage.getItem('map-zoom') || '10'),
      center: L.latLng(
        this.latitudeForce || parseFloat(localStorage.getItem('map-latitude') || '45'),
        this.longitudeForce || parseFloat(localStorage.getItem('map-longitude') || '4.5')
      ),
      layers: [
        {
          name: 'Eseri Topo',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; <a href="https://www.esrifrance.fr/">Esri</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
        },
        {
          name: 'Eseri Satelite',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; <a href="https://www.esrifrance.fr/">Esri</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
        }
      ],
      geoJsonOptions: {
        onEachFeature: this.onEachFeatureFunction(),
        pointToLayer: this.pointToLayerFunction()
      }
    }
  },

  mounted () {
    this.$root.$on('fitMapOnGeoJsonBounds', () => {
      this.fitGeoJsonBounds()
    })
  },

  beforeDestroy () {
    this.$root.$off('fitMapOnGeoJsonBounds')
  },

  computed: {
    layer () {
      return this.layers[this.layerIndex]
    }
  },

  beforeMount () {
    this.layerIndex = 0
  },

  methods: {
    pointToLayerFunction () {
      return (feature, latLng) => {
        if (feature.properties.icon === 'partner-user') {
          return L.marker(latLng, { icon: this.userMarker(feature.properties) })
        } else {
          return L.marker(latLng, { icon: this.markers[feature.properties.icon] })
        }
      }
    },

    onEachFeatureFunction () {
      return (feature, layer) => {
        layer.bindPopup(this.getHtmlPopup(feature))
      }
    },

    hideOpensControl: function () {
      this.$root.$emit('hideLeafletMapLayerSelector')
      this.$root.$emit('hideLeafletMapLegend')
    },

    savePosition: function () {
      if (!this.trackLocation) return

      const center = this.$refs.leafletMap.mapObject.getCenter()
      localStorage.setItem('map-latitude', center.lat)
      localStorage.setItem('map-longitude', center.lng)
    },

    saveZoom: function () {
      if (!this.trackLocation) return

      const zoom = this.$refs.leafletMap.mapObject.getZoom()
      localStorage.setItem('map-zoom', zoom)
    },

    fitGeoJsonBounds: function () {
      const bounds = L.geoJson(this.geoJsons).getBounds()
      this.$refs.leafletMap.mapObject.fitBounds(bounds)
    }
  }
}
</script>

<style lang="scss">
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
.map-popup-cover {
  background-color: rgb(240, 240, 240);
  border-radius: 4px 4px 0 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 300px;
  height: 150px;
}
.map-popup-information-table {
  width: 300px;
  color: black;
  th {
    width: 10px;
    text-align: right;
    white-space: nowrap;
    padding-right: 5px;
    padding-left: 5px;
  }
  .gym-map-title {
    font-weight: bold;
    padding: 10px;
    font-size: 1.2em;
  }
  .loved-by-king {
    padding: 10px;
    font-size: 2em;
  }
  cite {
    color: #808080;
  }
}
.map-popup-link-area {
  text-align: right;
  margin-top: 5px;
  padding: 7px 10px 7px 7px;
  border-top-style: solid;
  border-top-color: rgb(230,230,230);
  border-width: 1px;
  button {
    color: #1e88e5;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
  }
}

.leaflet-popup-content-wrapper {
  border-radius: 4px;
  padding: 0;
}
.leaflet-popup-content {
  margin: 0;
}
.map-popup-cover {
  width: 100%;
  position: relative;
  .user-map-popup-name-and-avatar {
    position: absolute;
    bottom: 0;
    width: 300px;
    padding-left: 5px;
    padding-bottom: 5px;
    .user-map-popup-avatar {
      height: 70px;
      width: 70px;
      border-radius: 50%;
      object-fit: cover;
    }
    .user-map-popup-name {
      margin-left: 5px;
      display: inline-block;
      color: white;
      padding: 5px 10px;
      border-radius: 3px;
      margin-top: 10px;
      vertical-align: top;
      background-color: rgba(0,0,0,0.8);
    }
  }
}
.map-popup-information-table {
  .map-popup-information-bio {
    padding-right: 8px;
    padding-left: 8px;
  }
}
.user-map-popup-last-activity-at {
  text-align: right;
  margin: 0 !important;
  padding-right: 8px;
}
.user-partner-map-marker {
  .user-partner-map-marker-avatar {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
  .user-partner-map-marker-caret {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: -5px;
    height: 10px;
  }
}
.leaflet-container a.leaflet-popup-close-button {
  padding-top: 7px;
  width: 30px;
  height: 30px;
}
.leaflet-customer-control {
  background-color: white;
  padding: 10px;
  color: black;
  .v-input {
    margin-top: 0;
    padding-top: 0;
  }
}
</style>
