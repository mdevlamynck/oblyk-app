<template>
  <div v-if="!loadingClimber">
    <v-card-title>
      <v-icon left>
        mdi-account-group
      </v-icon>
      {{ $tc('components.partner.xAround', climbers.length, { count: climbers.length }) }}
    </v-card-title>
    <v-card-text
      @click="climbersDialog = true"
      class="hoverable"
    >
      <div
        class="d-inline"
        v-for="(climber, index) in climbers"
        :key="`around-climber-${index}`"
      >
        <v-avatar
          v-if="index < limit"
          class="mr-2 mb-1"
          size="40"
        >
          <v-img :src="climber.thumbnailAvatarUrl()" />
        </v-avatar>
      </div>
      <v-avatar
        v-if="(climbers.length - limit) > 0"
        size="40"
      >
        <span class="font-weight-bold">
          +{{ (climbers.length - limit) }}
        </span>
      </v-avatar>
    </v-card-text>

    <v-dialog
      v-model="climbersDialog"
      max-width="700"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $tc('components.partner.xAround', climbers.length, { count: climbers.length }) }}
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
            text
            small
            @click="climbersDialog = false"
          >
            {{ $t('common.close') }}
          </v-btn>
          <v-btn
            text
            color="primary"
            :to="`/maps/climbers?lat=${latitude}&lng=${longitude}&zoom=12`"
          >
            <v-icon class="mr-2">
              mdi-map
            </v-icon>
            {{ $t('components.user.openClimbersMap') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PartnerApi from '@/services/oblyk-api/PartnerApi'
import User from '@/models/User'
import UserSmallCard from '@/components/users/UserSmallCard'

export default {
  name: 'ClimbersAround',
  components: { UserSmallCard },
  props: {
    latitude: [Number, String],
    longitude: [Number, String]
  },

  data () {
    return {
      climbersDialog: false,
      limit: 8,
      loadingClimber: true,
      distance: 15,
      climbers: []
    }
  },

  mounted () {
    this.getPartnersAround()
  },

  methods: {
    getPartnersAround: function () {
      this.loadingClimber = true
      PartnerApi
        .partnersAround(
          this.latitude,
          this.longitude,
          this.distance
        )
        .then(resp => {
          this.climbers = []
          for (const user of resp.data) {
            this.climbers.push(new User(user))
          }
        })
        .finally(() => {
          this.loadingClimber = false
        })
    }
  }
}
</script>
