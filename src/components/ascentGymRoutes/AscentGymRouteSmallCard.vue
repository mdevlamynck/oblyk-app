<template>
  <v-card flat>
    <v-card-text>
      <div>
        {{ $t('components.ascentGymRoute.ascentMadeOn', { date: humanizeDate(ascentGymRoute.released_at) }) }}
        <v-btn
          small
          icon
          @click="deleteAscent"
        >
          <v-icon small>mdi-delete</v-icon>
        </v-btn>
        <edit-gym-ascent-btn
          :gym-route="gymRoute"
          :ascent-gym-route="ascentGymRoute"
        />
      </div>

      <!-- Ascent status, Roping status & difficulty appreciation -->
      <ascent-gym-route-status-icon
        :gym-route="gymRoute"
        :ascent-status="ascentGymRoute.ascent_status"
      />
      {{ $t(`models.ascentStatus.${ascentGymRoute.ascent_status}`) }}

      <p class="mb-0">
        <cite v-if="ascentGymRoute.comment">
          {{ ascentGymRoute.comment }}
        </cite>
        <br v-if="ascentGymRoute.comment">
        <note
          v-if="ascentGymRoute.note"
          :note="ascentGymRoute.note"
        />
      </p>

      <div v-if="ascentGymRoute.GymRoute.sections_count > 1">
        <p
          class="text-decoration-underline mb-0"
          v-if="ascentGymRoute.GymRoute.sections_count === ascentGymRoute.sections.length"
        >
          {{ $t('components.ascentGymRoute.iMadeCountPitch', { count: ascentGymRoute.GymRoute.sections_count }) }}
        </p>
        <div v-else>
          <p class="mb-0 text-decoration-underline">
            {{ $t('components.ascentGymRoute.pitchMade') }} :
          </p>
          <ul class="list-style-none pl-3">
            <li
              v-for="(section, index) in ascentGymRoute.sections"
              :key="`ascent-section-${index}`"
            >
              <strong>L {{ section.index + 1 }} :</strong> {{ section.grade }}
            </li>
          </ul>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'
import AscentGymRouteApi from '@/services/oblyk-api/AscentGymRouteApi'
import store from '@/store'
import AscentGymRouteStatusIcon from '@/components/ascentGymRoutes/AscentGymRouteStatusIcon'
import EditGymAscentBtn from '@/components/ascentGymRoutes/EditGymAscentBtn'
import Note from '@/components/notes/Note'

export default {
  name: 'AscentGymRouteSmallCard',
  mixins: [DateHelpers, RecordToObjectHelpers],
  components: { Note, EditGymAscentBtn, AscentGymRouteStatusIcon },
  props: {
    ascentGymRoute: Object,
    gymRoute: Object
  },

  data () {
    return {
      ascentUserDialog: false,
      subscribes: [],
      loadingSubscribes: true
    }
  },

  methods: {
    deleteAscent: function () {
      if (confirm(this.$t('actions.areYouSur'))) {
        AscentGymRouteApi
          .delete(this.ascentGymRoute.id)
          .then(resp => {
            store.dispatch('auth/updateAscentGymRoutes', {
              ascent_gym_routes: resp.data
            })
            this.$root.$emit('reloadAscentGymRoute')
          })
          .catch(err => {
            this.$root.$emit('alertFromApiError', err, 'ascentGymRoute')
          })
      }
    }
  }
}
</script>
