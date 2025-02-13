<template>
  <v-navigation-drawer
    class="crag-route-drawer"
    v-model="cragRouteDrawer"
    temporary
    absolute
    right
  >
    <spinner v-if="loadingCragRoute" />
    <div v-if="!loadingCragRoute">
      <crag-route-head
        :crag-route="cragRoute"
      />
      <div class="pr-3 pl-3 pt-1">
        <crag-route-description :crag-route="cragRoute" />
        <crag-route-ascent
          v-if="isLoggedIn"
          :crag-route="cragRoute"
        />
        <v-divider class="mt-5 mb-5" />
        <crag-route-comments :crag-route="cragRoute" />
        <v-divider class="mt-5 mb-5" />
        <crag-route-photos :crag-route="cragRoute" lg-col="col-lg-6" />
        <v-divider class="mt-5 mb-5" />
        <crag-route-videos :crag-route="cragRoute" lg-col="col-lg-6" />
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import Spinner from '@/components/layouts/Spiner'
import CragRouteApi from '@/services/oblyk-api/CragRouteApi'
import CragRoute from '@/models/CragRoute'
import CragRouteHead from '@/components/cragRoutes/layout/CragRouteHead'
import CragRouteDescription from '@/components/cragRoutes/CragRouteDescription'
import CragRouteComments from '@/components/cragRoutes/CragRouteComments'
import CragRoutePhotos from '@/components/cragRoutes/CragRoutePhotos'
import CragRouteVideos from '@/components/cragRoutes/CragRouteVideos'
import CragRouteAscent from '@/components/cragRoutes/CragRouteAscent'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'CragRouteDrawer',
  mixins: [SessionConcern],
  components: {
    CragRouteAscent,
    CragRouteVideos,
    CragRoutePhotos,
    CragRouteComments,
    CragRouteDescription,
    CragRouteHead,
    Spinner
  },
  data () {
    return {
      cragRouteDrawer: false,
      loadingCragRoute: true,
      cragRouteId: null,
      cragId: null,
      cragRoute: null
    }
  },

  mounted () {
    this.$root.$on('getCragRouteInDrawer', (cragId, cragRouteId) => {
      this.cragRouteId = cragRouteId
      this.cragId = cragId
      this.getCragRoute()
    })
  },

  beforeDestroy () {
    this.$root.$off('getCragRouteInDrawer')
  },

  methods: {
    getCragRoute: function () {
      this.cragRouteDrawer = true
      this.loadingCragRoute = true

      CragRouteApi
        .find(
          this.cragId,
          this.cragRouteId
        )
        .then(resp => {
          this.cragRoute = new CragRoute(resp.data)
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'cragRoute')
        })
        .then(() => {
          this.loadingCragRoute = false
        })
    }
  }
}
</script>

<style lang="scss">
.crag-route-drawer {
  width: 700px !important;
  max-width: calc(100vw - 50px);
  position: fixed;
  height: 100vh !important;
}

.theme--light {
  .crag-route-drawer {
    .v-card, .v-data-table {
      background-color: #f5f5f5;
    }
  }
}
</style>
