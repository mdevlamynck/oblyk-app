<template>
  <v-sheet
    v-if="user.latitude && user.longitude"
    class="rounded pl-3 pr-3 around-card"
  >
    <v-row>
      <v-col
        @click="aroundSettingsDialog = true"
        class="text-truncate hover-col"
        v-bind:class="user.partner_search ? 'col-12 col-md-6' : 'col-12 col-md-4'"
        :title="user.localization"
      >
        <v-icon
          left
          small
        >
          mdi-map-marker-radius
        </v-icon>
        {{ $t('components.user.distanceAround', { distance: distance }) }}
      </v-col>

      <!-- Crags -->
      <v-col
        @click="cragsDialog = true"
        class="text-truncate text-center hover-col"
        v-bind:class="user.partner_search ? 'col-4 col-md-2' : 'col-6 col-md-4'"
      >
        <v-icon small left>mdi-terrain</v-icon>
        {{ $tc('components.crag.cragCount', crags.length, { count: crags.length }) }}
      </v-col>

      <!-- Gyms -->
      <v-col
        class="text-truncate text-center hover-col"
        @click="gymsDialog = true"
        v-bind:class="user.partner_search ? 'col-4 col-md-2' : 'col-6 col-md-4'"
      >
        <v-icon small left>mdi-home-roof</v-icon>
        {{ $tc('components.gym.gymCount', gyms.length, { count: gyms.length }) }}
      </v-col>

      <!-- Climbers -->
      <v-col
        v-if="user.partner_search"
        @click="climbersDialog = true"
        class="col-4 col-md-2 text-center text-truncate hover-col"
      >
        <v-icon small left>mdi-human</v-icon>
        {{ $tc('components.user.userCount', climbers.length, { count: climbers.length }) }}
      </v-col>
    </v-row>

    <!-- Crags dialog -->
    <v-dialog
      v-model="cragsDialog"
      max-width="700"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $tc('components.crag.cragAround', crags.length, { count: crags.length }) }}
        </v-card-title>
        <v-card-text>
          <crag-small-card
            v-for="(crag, index) in crags"
            :key="`crags-${index}`"
            :crag="crag"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="cragsDialog = false"
          >
            {{ $t('common.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Gyms modal -->
    <v-dialog
      v-model="gymsDialog"
      max-width="700"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $tc('components.gym.gymAround', gyms.length, { count: gyms.length }) }}
        </v-card-title>
        <v-card-text>
          <gym-small-card
            v-for="(gym, index) in gyms"
            :key="`gyms-${index}`"
            :gym="gym"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="gymsDialog = false"
          >
            {{ $t('common.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- climbers modal -->
    <v-dialog
      v-model="climbersDialog"
      max-width="700"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $tc('components.user.userAround', climbers.length, { count: climbers.length }) }}
        </v-card-title>
        <v-card-text>
          <user-small-card
            v-for="(user, index) in climbers"
            :key="`users-${index}`"
            :small="true"
            :user="user"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="climbersDialog = false"
          >
            {{ $t('common.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Around Settings modal -->
    <v-dialog
      v-model="aroundSettingsDialog"
      max-width="700"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $tc('components.user.aroundSettings') }}
        </v-card-title>
        <v-card-text>
          <p>{{ $t('components.user.chooseNewsArea') }}</p>
          <v-slider
            v-model="settingDistance"
            color="primary"
            :label="$t('components.user.distanceSetting', { distance: settingDistance })"
            min="1"
            max="100"
            thumb-label
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="aroundSettingsDialog = false"
          >
            {{ $t('common.close') }}
          </v-btn>
          <v-btn
            color="primary"
            @click="setFeedSetting()"
          >
            {{ $t('components.user.saveMyPreference') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import CragApi from '@/services/oblyk-api/CragApi'
import GymApi from '@/services/oblyk-api/GymApi'
import PartnerApi from '@/services/oblyk-api/PartnerApi'
import Crag from '@/models/Crag'
import Gym from '@/models/Gym'
import User from '@/models/User'
import CragSmallCard from '@/components/crags/CragSmallCard'
import GymSmallCard from '@/components/gyms/GymSmallCard'
import UserSmallCard from '@/components/users/UserSmallCard'

export default {
  name: 'AroundCard',
  components: { UserSmallCard, GymSmallCard, CragSmallCard },
  props: {
    user: Object
  },

  data () {
    return {
      distance: localStorage.getItem('distanceAroundLocation') || 20,
      settingDistance: null,
      cragsDialog: false,
      gymsDialog: false,
      climbersDialog: false,
      aroundSettingsDialog: false,
      crags: [],
      gyms: [],
      climbers: []
    }
  },

  watch: {
    distance: function () {
      this.getElementAround()
    }
  },

  mounted () {
    this.settingDistance = this.distance
    this.getElementAround()
  },

  methods: {
    getElementAround: function () {
      if (this.user.latitude) {
        this.getCragsAround()
        this.getGymsAround()
        if (this.user.partner_search) this.getPartnersAround()
      }
    },

    getCragsAround: function () {
      CragApi
        .cragsAround(
          this.user.latitude,
          this.user.longitude,
          this.distance
        )
        .then(resp => {
          this.crags = []
          for (const crag of resp.data) {
            this.crags.push(new Crag(crag))
          }
        })
    },

    getGymsAround: function () {
      GymApi
        .gymsAround(
          this.user.latitude,
          this.user.longitude,
          this.distance
        )
        .then(resp => {
          this.gyms = []
          for (const gym of resp.data) {
            this.gyms.push(new Gym(gym))
          }
        })
    },

    getPartnersAround: function () {
      PartnerApi
        .partnersAround(
          this.user.latitude,
          this.user.longitude,
          this.distance
        )
        .then(resp => {
          this.climbers = []
          for (const user of resp.data) {
            this.climbers.push(new User(user))
          }
        })
    },

    setFeedSetting: function () {
      this.distance = this.settingDistance
      localStorage.setItem('distanceAroundLocation', this.settingDistance)
      this.aroundSettingsDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.around-card {
  font-size: 0.8em;
  .hover-col {
    cursor: pointer;
    &:hover {
      color: #1e88e5;
      .v-icon {
        color: #1e88e5;
      }
    }
  }
}
</style>
