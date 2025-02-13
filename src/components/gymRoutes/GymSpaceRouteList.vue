<template>
  <div>
    <!-- Sort sector select -->
    <gym-space-route-sort v-model="sort" />

    <!-- Active filter -->
    <div v-if="filter.text">
      <v-chip
        class="ma-2"
        close
        @click:close="clearFilter()"
      >
        <v-icon x-small left>
          {{ filter.icon }}
        </v-icon>
        {{ filter.text }}
      </v-chip>
    </div>

    <!-- Load routes -->
    <spinner v-if="loadingRoutes" :full-height="false" />

    <!-- Routes list -->
    <div v-if="!loadingRoutes">

      <!-- If sort by sector -->
      <div v-if="sort === 'sector'">
        <gym-routes-by-sector
          :sectors="sectors"
          :placement="placement"
          :get-routes="getRoutes"
        />
      </div>

      <!-- If sort by opened_at -->
      <div v-if="sort === 'opened_at'">
        <gym-routes-by-opened-at
          :opened-ats="openedAts"
          :placement="placement"
          :get-routes="getRoutes"
        />
        <!-- if no routes in opened_ats -->
        <div v-if="openedAts.length === 0">
          <p class="text-center text--disabled">
            {{ $t('components.gymRoute.noRoute') }}
          </p>
        </div>
      </div>

      <!-- If sort by grade -->
      <div v-if="sort === 'grade'">
        <gym-routes-by-grade
          :grades="grades"
          :placement="placement"
          :get-routes="getRoutes"
        />
        <!-- if no routes in grade -->
        <div v-if="grades.length === 0">
          <p class="text-center text--disabled">
            {{ $t('components.gymRoute.noRoute') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import GymSpaceRouteSort from '@/components/gymRoutes/partial/GymSpaceRouteSort'
import Spinner from '@/components/layouts/Spiner'
import gymRouteApi from '@/services/oblyk-api/GymRouteApi'
import GymSectorApi from '@/services/oblyk-api/GymSectorApi'
import GymRoute from '@/models/GymRoute'
import GymSector from '@/models/GymSector'
import GymRoutesBySector from '@/components/gymRoutes/listByGroup/GymRoutesBySector'
import GymRoutesByOpenedAt from '@/components/gymRoutes/listByGroup/GymRoutesByOpenedAt'
import GymRoutesByGrade from '@/components/gymRoutes/listByGroup/GymRoutesByGrade'

export default {
  name: 'GymSpaceRouteList',
  components: {
    GymRoutesByGrade,
    GymRoutesByOpenedAt,
    GymRoutesBySector,
    Spinner,
    GymSpaceRouteSort
  },
  mixins: [SessionConcern],
  props: {
    gymSpace: Object
  },

  data () {
    return {
      sort: (localStorage.getItem('gym_route_sort') || 'opened_at'),
      routes: [],
      sectors: [],
      openedAts: [],
      grades: [],
      gymRoutes: [],
      loadingRoutes: true,
      filter: {
        text: null,
        icon: null
      }
    }
  },

  mounted () {
    this.$root.$on('filterBySector', (gymSectorId) => {
      this.filterBySector(gymSectorId)
    })

    this.$root.$on('dismountGymRoutesInSector', (gymId, spaceId, sectorId) => {
      this.dismountRoutes(gymId, spaceId, sectorId)
    })

    this.getRoutes()
  },

  beforeDestroy () {
    this.$root.$off('filterBySector')
    this.$root.$off('dismountGymRoutesInSector')
  },

  watch: {
    sort: function () {
      this.getRoutes()
      localStorage.setItem('gym_route_sort', this.sort)
    },
    gymSpace: function () {
      this.getRoutes()
    }
  },

  methods: {
    getRoutes: function (sectorFilter = null) {
      this.loadingRoutes = true

      gymRouteApi
        .allInSpace(
          this.gymSpace.gym.id,
          this.gymSpace.id,
          this.sort,
          this.sort
        )
        .then(resp => {
          this.gymRoutes = []
          this.sectors = []
          this.grades = []
          this.openedAts = []

          // If by sector
          if (this.sort === 'sector') {
            const sectors = resp.data.sectors
            for (const sector of sectors) {
              // Next if filter sector and not good sector
              if (sectorFilter && sector.sector.id !== sectorFilter) continue

              const routes = []
              for (const route of sector.routes) {
                routes.push(new GymRoute(route))
              }
              this.sectors.push({
                sector: new GymSector(sector.sector),
                routes: routes
              })
            }
          } else if (this.sort === 'opened_at') {
            // If by opened_at
            const openedAts = resp.data.opened_at
            for (const openedAt of openedAts) {
              const routes = []
              for (const route of openedAt.routes) {
                routes.push(new GymRoute(route))
              }
              this.openedAts.push({
                openedAt: openedAt.opened_at,
                routes: routes
              })
            }
          } else if (this.sort === 'grade') {
            // If by grade
            const grades = resp.data.grade
            for (const grade of grades) {
              const routes = []
              for (const route of grade.routes) {
                routes.push(new GymRoute(route))
              }
              this.grades.push({
                grade: grade.grade,
                routes: routes
              })
            }
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        })
        .finally(() => {
          this.loadingRoutes = false
        })
    },

    placement: function (index, length) {
      if (index === 0 && length > 1) {
        return 'first'
      } else if (index === 0 && length === 1) {
        return 'unique'
      } else if (index !== 0 && index + 1 !== length) {
        return 'middle'
      } else {
        return 'last'
      }
    },

    filterBySector: function (sectorId) {
      this.filter.text = `secteur ${sectorId}`
      this.filter.icon = 'mdi-texture-box'
      this.getRoutes(sectorId)
      this.$root.$emit('showGymSpaceLine')
    },

    clearFilter: function () {
      this.filter.text = null
      this.filter.icon = null
      this.getRoutes()
    },

    dismountRoutes: function (gymId, spaceId, sectorId) {
      this.loadingRoutes = true
      GymSectorApi
        .dismountRoutes(
          gymId,
          spaceId,
          sectorId
        )
        .then(() => {
          this.getRoutes()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
          this.loadingRoutes = false
        })
    }
  }
}
</script>
